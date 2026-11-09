import { loadJson, updateBest, type ScoreBoard } from '../shared/storage';
import { appendSession, formatSessionTime, loadSessions } from '../shared/sessionLog';
import { runCountdownAsync } from '../shared/countdown';
import { bindKeys } from '../shared/keyboard';
import { renderSessionList } from '../shared/stats';
import { pageLocaleFromDocument } from '../../i18n/locale-dom';
import { getToolMessages } from '../../i18n/tool-messages';

const TOOL_KEY = 'schulte';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatMs(ms: number): string {
  return (ms / 1000).toFixed(2) + 's';
}

export function initSchulte(root: HTMLElement): void {
  const m = getToolMessages(pageLocaleFromDocument()).schulte;
  const grid = root.querySelector<HTMLElement>('[data-grid]')!;
  const targetEl = root.querySelector<HTMLElement>('[data-target]')!;
  const timerEl = root.querySelector<HTMLElement>('[data-timer]')!;
  const bestEl = root.querySelector<HTMLElement>('[data-best]')!;
  const lastEl = root.querySelector<HTMLElement>('[data-last]')!;
  const errorsEl = root.querySelector<HTMLElement>('[data-errors]')!;
  const feedback = root.querySelector<HTMLElement>('[data-feedback]')!;
  const countdownEl = root.querySelector<HTMLElement>('[data-countdown]')!;
  const sessionsEl = root.querySelector<HTMLElement>('[data-sessions]')!;
  const startBtn = root.querySelector<HTMLButtonElement>('[data-start]')!;
  const sizeSelect = root.querySelector<HTMLSelectElement>('[data-size]')!;

  let size = 5;
  let next = 1;
  let errors = 0;
  let startedAt = 0;
  let raf = 0;
  let playing = false;
  let clicksEnabled = false;

  function paintScores() {
    const key = `bth:schulte:${size}`;
    const board = loadJson<ScoreBoard>(key, {});
    bestEl.textContent = board.best != null ? formatMs(board.best) : '—';
    lastEl.textContent = board.last != null ? formatMs(board.last) : '—';
  }

  function paintSessions() {
    const lines = loadSessions(TOOL_KEY).map((s) => {
      const t = s.metrics.timeMs as number;
      const sz = s.metrics.size as number;
      return `${formatSessionTime(s.at)} · ${sz}×${sz} ${formatMs(t)}`;
    });
    if (sessionsEl) renderSessionList(sessionsEl, lines);
  }

  function tick() {
    if (!playing) return;
    timerEl.textContent = formatMs(performance.now() - startedAt);
    raf = requestAnimationFrame(tick);
  }

  function build() {
    const total = size * size;
    const nums = shuffle(Array.from({ length: total }, (_, i) => i + 1));
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.innerHTML = '';
    nums.forEach((n) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'schulte-cell';
      btn.textContent = String(n);
      btn.dataset.num = String(n);
      btn.disabled = !clicksEnabled;
      btn.addEventListener('click', () => onCell(btn, n));
      grid.appendChild(btn);
    });
    next = 1;
    errors = 0;
    errorsEl.textContent = '0';
    targetEl.textContent = '1';
    timerEl.textContent = '0.00s';
  }

  function setClicksEnabled(on: boolean) {
    clicksEnabled = on;
    grid.querySelectorAll('button').forEach((b) => ((b as HTMLButtonElement).disabled = !on));
  }

  function finish() {
    playing = false;
    setClicksEnabled(false);
    cancelAnimationFrame(raf);
    const elapsed = performance.now() - startedAt;
    timerEl.textContent = formatMs(elapsed);
    updateBest(`bth:schulte:${size}`, elapsed, 'min');
    paintScores();
    appendSession(TOOL_KEY, { size, timeMs: elapsed, errors });
    paintSessions();
    feedback.textContent = m.complete(formatMs(elapsed), errors);
    feedback.className = 'tool-feedback is-ok';
    startBtn.textContent = m.again;
    startBtn.disabled = false;
  }

  function onCell(btn: HTMLButtonElement, n: number) {
    if (!playing || !clicksEnabled) return;
    if (n === next) {
      btn.classList.add('is-hit');
      btn.disabled = true;
      next += 1;
      if (next > size * size) {
        finish();
      } else {
        targetEl.textContent = String(next);
      }
    } else {
      errors += 1;
      errorsEl.textContent = String(errors);
      btn.classList.add('is-miss');
      setTimeout(() => btn.classList.remove('is-miss'), 220);
      feedback.textContent = m.find(next);
      feedback.className = 'tool-feedback is-bad';
    }
  }

  async function start() {
    if (playing) return;
    size = Number(sizeSelect.value) || 5;
    build();
    playing = true;
    setClicksEnabled(false);
    startBtn.disabled = true;
    startBtn.textContent = m.preparing;
    feedback.textContent = m.prep;
    feedback.className = 'tool-feedback';
    countdownEl.textContent = '3';
    await runCountdownAsync(3, (n) => {
      countdownEl.textContent = String(n);
    });
    countdownEl.textContent = '';
    startedAt = performance.now();
    startBtn.textContent = m.inProgress;
    setClicksEnabled(true);
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  startBtn.addEventListener('click', () => void start());
  sizeSelect.addEventListener('change', () => {
    size = Number(sizeSelect.value) || 5;
    paintScores();
    if (!playing) build();
  });

  bindKeys({ ' ': () => !playing && void start() });

  build();
  paintScores();
  paintSessions();
}
