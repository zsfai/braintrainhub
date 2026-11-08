import { loadJson, updateBest, type ScoreBoard } from '../shared/storage';
import { appendSession, formatSessionTime, loadSessions } from '../shared/sessionLog';
import { bindKeys } from '../shared/keyboard';
import { renderSessionList } from '../shared/stats';

const LETTERS = 'ABCDEFGHJKLMNPRSTU';
const TOOL_KEY = 'nback';
const STIM_MS = 2500;
const ISI_MS = 500;
const ANSWER_BUFFER_MS = 400;

type Trial = { letter: string; isMatch: boolean };

function generateBlock(n: number, count: number, matchRate = 0.3): Trial[] {
  const trials: Trial[] = [];
  for (let i = 0; i < count; i++) {
    if (i < n) {
      trials.push({ letter: randomLetter(), isMatch: false });
      continue;
    }
    const wantMatch = Math.random() < matchRate;
    const prev = trials[i - n].letter;
    let letter: string;
    if (wantMatch) {
      letter = prev;
    } else {
      do {
        letter = randomLetter();
      } while (letter === prev);
    }
    trials.push({ letter, isMatch: wantMatch });
  }
  return trials;
}

function randomLetter() {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

export function initNBack(root: HTMLElement): void {
  const letterEl = root.querySelector<HTMLElement>('[data-letter]')!;
  const feedback = root.querySelector<HTMLElement>('[data-feedback]')!;
  const roundEl = root.querySelector<HTMLElement>('[data-round]')!;
  const scoreEl = root.querySelector<HTMLElement>('[data-score]')!;
  const detailEl = root.querySelector<HTMLElement>('[data-detail]')!;
  const bestEl = root.querySelector<HTMLElement>('[data-best]')!;
  const sessionsEl = root.querySelector<HTMLElement>('[data-sessions]')!;
  const startBtn = root.querySelector<HTMLButtonElement>('[data-start]')!;
  const matchBtn = root.querySelector<HTMLButtonElement>('[data-match]')!;
  const mismatchBtn = root.querySelector<HTMLButtonElement>('[data-mismatch]')!;
  const nSelect = root.querySelector<HTMLSelectElement>('[data-n]')!;
  const lenSelect = root.querySelector<HTMLSelectElement>('[data-len]')!;

  let n = 2;
  let trials: Trial[] = [];
  let index = -1;
  let correct = 0;
  let hits = 0;
  let misses = 0;
  let falseAlarms = 0;
  let correctRejects = 0;
  let answered = 0;
  let running = false;
  let canAnswer = false;
  let answeredThisTrial = false;
  let timers: number[] = [];

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function storageKey() {
    return `bth:nback:${n}`;
  }

  function paintBest() {
    const board = loadJson<ScoreBoard>(storageKey(), {});
    bestEl.textContent = board.best != null ? `${Math.round(board.best)}%` : '—';
  }

  function paintSessions() {
    const lines = loadSessions(TOOL_KEY).map((s) => {
      const acc = s.metrics.accuracy as number;
      const nn = s.metrics.n as number;
      return `${formatSessionTime(s.at)} · ${nn}-Back ${acc}%`;
    });
    if (sessionsEl) renderSessionList(sessionsEl, lines);
  }

  function setControls(enabled: boolean) {
    canAnswer = enabled;
    matchBtn.disabled = !enabled;
    mismatchBtn.disabled = !enabled;
  }

  function finish() {
    running = false;
    clearTimers();
    setControls(false);
    const accuracy = answered ? (correct / answered) * 100 : 0;
    updateBest(storageKey(), accuracy, 'max');
    paintBest();
    appendSession(TOOL_KEY, { n, accuracy, hits, misses, falseAlarms, correctRejects });
    paintSessions();
    letterEl.textContent = '✓';
    detailEl.textContent = `命中 ${hits} · 漏答 ${misses} · 虚警 ${falseAlarms} · 正确拒绝 ${correctRejects}`;
    feedback.textContent = `结束：正确率 ${accuracy.toFixed(0)}%（${correct}/${answered}）`;
    feedback.className = 'tool-feedback is-ok';
    startBtn.textContent = '再来一组';
    startBtn.disabled = false;
  }

  function nextTrial() {
    index += 1;
    if (index >= trials.length) {
      finish();
      return;
    }
    const trial = trials[index];
    letterEl.textContent = trial.letter;
    roundEl.textContent = `${Math.max(0, index - n + 1)} / ${trials.length - n}`;
    answeredThisTrial = false;
    const answerable = index >= n;
    setControls(false);
    feedback.textContent = answerable ? '是否与 N 步之前相同？（F 相同 / J 不同）' : `预热 ${index + 1}/${n}`;
    feedback.className = 'tool-feedback';

    timers.push(
      window.setTimeout(() => {
        if (!running) return;
        if (answerable) setControls(true);
      }, 120),
    );

    timers.push(
      window.setTimeout(() => {
        if (!running || !answerable) {
          timers.push(window.setTimeout(nextTrial, ISI_MS));
          return;
        }
        if (!answeredThisTrial) {
          registerAnswer(null);
        }
      }, STIM_MS + ANSWER_BUFFER_MS),
    );
  }

  function registerAnswer(userSaysMatch: boolean | null) {
    if (!running || index < n || answeredThisTrial) return;
    answeredThisTrial = true;
    setControls(false);
    const trial = trials[index];
    answered += 1;
    const actualMatch = trial.letter === trials[index - n].letter;

    let ok = false;
    if (userSaysMatch === null) {
      misses += actualMatch ? 1 : 0;
      correctRejects += actualMatch ? 0 : 1;
      feedback.textContent = actualMatch ? '漏答（应为相同）' : '超时（视为不同，正确）';
      feedback.className = actualMatch ? 'tool-feedback is-bad' : 'tool-feedback';
      ok = !actualMatch;
    } else if (userSaysMatch === actualMatch) {
      ok = true;
      if (actualMatch) hits += 1;
      else correctRejects += 1;
      feedback.textContent = '正确';
      feedback.className = 'tool-feedback is-ok';
    } else {
      if (userSaysMatch) falseAlarms += 1;
      else misses += actualMatch ? 1 : 0;
      feedback.textContent = actualMatch ? '应为「相同」' : '应为「不同」';
      feedback.className = 'tool-feedback is-bad';
    }

    if (ok) correct += 1;
    scoreEl.textContent = `${correct}/${answered}`;
    timers.push(window.setTimeout(() => {
      letterEl.textContent = '·';
      timers.push(window.setTimeout(nextTrial, ISI_MS));
    }, 350));
  }

  function start() {
    if (running) return;
    clearTimers();
    n = Number(nSelect.value) || 2;
    const len = Number(lenSelect?.value) || 20;
    trials = generateBlock(n, len + n, 0.3);
    index = -1;
    correct = 0;
    answered = 0;
    hits = 0;
    misses = 0;
    falseAlarms = 0;
    correctRejects = 0;
    running = true;
    scoreEl.textContent = '0/0';
    detailEl.textContent = '';
    startBtn.textContent = '进行中…';
    startBtn.disabled = true;
    paintBest();
    nextTrial();
  }

  matchBtn.addEventListener('click', () => registerAnswer(true));
  mismatchBtn.addEventListener('click', () => registerAnswer(false));
  startBtn.addEventListener('click', start);
  nSelect.addEventListener('change', paintBest);

  bindKeys({
    f: () => registerAnswer(true),
    j: () => registerAnswer(false),
  });

  setControls(false);
  paintBest();
  paintSessions();
  letterEl.textContent = '·';
  feedback.textContent = '选择 N 与试次数后开始。F=相同，J=不同。';
}
