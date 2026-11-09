import { loadJson, updateBest, type ScoreBoard } from '../shared/storage';
import { appendSession, formatSessionTime, loadSessions } from '../shared/sessionLog';
import { bindKeys, mean } from '../shared/keyboard';
import { renderSessionList } from '../shared/stats';
import { runCountdownAsync } from '../shared/countdown';
import { pageLocaleFromDocument } from '../../i18n/locale-dom';
import { getToolMessages, type StroopColor } from '../../i18n/tool-messages';

const STORAGE_KEY = 'bth:stroop';
const TOOL_KEY = 'stroop';

type TrialType = 'congruent' | 'incongruent' | 'neutral';

type Trial = {
  type: TrialType;
  word: string;
  inkName: string;
  inkCss: string;
};

function buildTrials(total: number, colors: StroopColor[]): Trial[] {
  const trials: Trial[] = [];
  const congruentN = Math.round(total * 0.3);
  const neutralN = Math.round(total * 0.2);
  const incongruentN = total - congruentN - neutralN;
  const bag: TrialType[] = [
    ...Array(congruentN).fill('congruent'),
    ...Array(incongruentN).fill('incongruent'),
    ...Array(neutralN).fill('neutral'),
  ];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  for (const type of bag) {
    const ink = colors[Math.floor(Math.random() * colors.length)];
    if (type === 'neutral') {
      trials.push({ type, word: '+++', inkName: ink.name, inkCss: ink.css });
      continue;
    }
    if (type === 'congruent') {
      trials.push({ type, word: ink.name, inkName: ink.name, inkCss: ink.css });
    } else {
      let meaning = colors[Math.floor(Math.random() * colors.length)];
      while (meaning.name === ink.name) meaning = colors[Math.floor(Math.random() * colors.length)];
      trials.push({ type, word: meaning.name, inkName: ink.name, inkCss: ink.css });
    }
  }
  return trials;
}

export function initStroop(root: HTMLElement): void {
  const kit = getToolMessages(pageLocaleFromDocument());
  const COLORS = kit.stroopColors;
  const s = kit.stroop;

  const wordEl = root.querySelector<HTMLElement>('[data-word]')!;
  const choicesEl = root.querySelector<HTMLElement>('[data-choices]')!;
  const feedback = root.querySelector<HTMLElement>('[data-feedback]')!;
  const scoreEl = root.querySelector<HTMLElement>('[data-score]')!;
  const effectEl = root.querySelector<HTMLElement>('[data-effect]')!;
  const timerEl = root.querySelector<HTMLElement>('[data-timer]')!;
  const bestEl = root.querySelector<HTMLElement>('[data-best]')!;
  const sessionsEl = root.querySelector<HTMLElement>('[data-sessions]')!;
  const startBtn = root.querySelector<HTMLButtonElement>('[data-start]')!;
  const lenSelect = root.querySelector<HTMLSelectElement>('[data-len]')!;

  let trials: Trial[] = [];
  let index = 0;
  let correct = 0;
  let playing = false;
  let shownAt = 0;
  let startedAt = 0;
  const rts: { type: TrialType; rt: number; ok: boolean }[] = [];

  function paintBest() {
    const board = loadJson<ScoreBoard>(STORAGE_KEY, {});
    bestEl.textContent = board.best != null ? `${Math.round(board.best)}%` : '—';
  }

  function paintSessions() {
    const lines = loadSessions(TOOL_KEY).map((row) => {
      const acc = row.metrics.accuracy as number;
      const fx = row.metrics.stroopMs as number;
      return s.sessionLine(formatSessionTime(row.at), acc, fx);
    });
    if (sessionsEl) renderSessionList(sessionsEl, lines);
  }

  function renderChoices() {
    choicesEl.innerHTML = '';
    COLORS.forEach((c) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn--ghost stroop-choice';
      btn.textContent = `${c.key} ${c.name}`;
      btn.addEventListener('click', () => onChoice(c.name));
      choicesEl.appendChild(btn);
    });
  }

  function showTrial() {
    const t = trials[index];
    wordEl.textContent = t.word;
    wordEl.style.color = t.inkCss;
    shownAt = performance.now();
    scoreEl.textContent = `${correct}/${index}`;
    feedback.textContent = s.pickInk;
    feedback.className = 'tool-feedback';
    choicesEl.querySelectorAll('button').forEach((b) => ((b as HTMLButtonElement).disabled = false));
  }

  function finish() {
    playing = false;
    const accuracy = trials.length ? (correct / trials.length) * 100 : 0;
    const cong = rts.filter((r) => r.ok && r.type === 'congruent').map((r) => r.rt);
    const inc = rts.filter((r) => r.ok && r.type === 'incongruent').map((r) => r.rt);
    const stroopMs = cong.length && inc.length ? mean(inc) - mean(cong) : 0;
    updateBest(STORAGE_KEY, accuracy, 'max');
    paintBest();
    appendSession(TOOL_KEY, { accuracy, stroopMs, effect: stroopMs });
    paintSessions();
    const elapsed = performance.now() - startedAt;
    timerEl.textContent = `${(elapsed / 1000).toFixed(1)}s`;
    effectEl.textContent =
      cong.length && inc.length ? s.effect(stroopMs) : s.effectNa;
    feedback.textContent = s.done(accuracy);
    feedback.className = 'tool-feedback is-ok';
    startBtn.textContent = s.again;
    startBtn.disabled = false;
    choicesEl.querySelectorAll('button').forEach((b) => ((b as HTMLButtonElement).disabled = true));
  }

  function onChoice(name: string) {
    if (!playing) return;
    const t = trials[index];
    const rt = performance.now() - shownAt;
    const ok = name === t.inkName;
    rts.push({ type: t.type, rt, ok });
    if (ok) correct += 1;
    else {
      feedback.textContent = s.wrong(t.inkName);
      feedback.className = 'tool-feedback is-bad';
    }
    index += 1;
    scoreEl.textContent = `${correct}/${index}`;
    if (index >= trials.length) {
      finish();
      return;
    }
    window.setTimeout(showTrial, 280);
  }

  async function start() {
    if (playing) return;
    const total = Number(lenSelect?.value) || 24;
    trials = buildTrials(total, COLORS);
    index = 0;
    correct = 0;
    rts.length = 0;
    playing = true;
    startedAt = performance.now();
    startBtn.textContent = s.running;
    startBtn.disabled = true;
    effectEl.textContent = '';
    renderChoices();
    feedback.textContent = s.ready;
    await runCountdownAsync(3, (n) => {
      feedback.textContent = String(n);
    });
    showTrial();
  }

  startBtn.addEventListener('click', () => void start());
  const keyMap: Record<string, () => void> = {};
  COLORS.forEach((c) => {
    keyMap[c.key] = () => onChoice(c.name);
  });
  bindKeys(keyMap);
  paintBest();
  paintSessions();
  renderChoices();
  wordEl.textContent = s.inkWord;
  wordEl.style.color = 'var(--accent)';
}
