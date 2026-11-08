import { loadJson, updateBest, type ScoreBoard } from '../shared/storage';
import { appendSession, formatSessionTime, loadSessions } from '../shared/sessionLog';
import { bindKeys, mean, median, stdDev } from '../shared/keyboard';
import { renderSessionList } from '../shared/stats';
import { runCountdownAsync } from '../shared/countdown';

const STORAGE_KEY = 'bth:reaction';
const TOOL_KEY = 'reaction';
const TRIALS_PER_BLOCK = 6;

type Phase = 'idle' | 'countdown' | 'wait' | 'go' | 'tooSoon' | 'blockDone';

export function initReaction(root: HTMLElement): void {
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const label = root.querySelector<HTMLElement>('[data-label]')!;
  const bestEl = root.querySelector<HTMLElement>('[data-best]')!;
  const summaryEl = root.querySelector<HTMLElement>('[data-summary]')!;
  const sessionsEl = root.querySelector<HTMLElement>('[data-sessions]')!;
  const startBtn = root.querySelector<HTMLButtonElement>('[data-start]')!;

  let phase: Phase = 'idle';
  let goAt = 0;
  let timer = 0;
  let blockRts: number[] = [];
  let trialInBlock = 0;

  function paintBest() {
    const board = loadJson<ScoreBoard>(STORAGE_KEY, {});
    bestEl.textContent = board.best != null ? `${Math.round(board.best)} ms` : '—';
  }

  function paintSessions() {
    const lines = loadSessions(TOOL_KEY).map((s) => {
      const med = s.metrics.median as number;
      return `${formatSessionTime(s.at)} · 中位 ${Math.round(med)} ms`;
    });
    if (sessionsEl) renderSessionList(sessionsEl, lines);
  }

  function setPhase(next: Phase, text: string) {
    phase = next;
    stage.classList.remove('is-wait', 'is-go');
    if (next === 'wait') stage.classList.add('is-wait');
    if (next === 'go') stage.classList.add('is-go');
    label.textContent = text;
    label.className =
      next === 'blockDone' && blockRts.length
        ? 'reaction-stage__ms'
        : 'reaction-stage__label';
  }

  function armTrial() {
    clearTimeout(timer);
    setPhase('wait', `试次 ${trialInBlock + 1}/${TRIALS_PER_BLOCK}\n等待变绿…`);
    const delay = 1200 + Math.random() * 2800;
    timer = window.setTimeout(() => {
      goAt = performance.now();
      setPhase('go', '点击！');
    }, delay);
  }

  function finishBlock() {
    const med = median(blockRts);
    const mn = mean(blockRts);
    const sd = stdDev(blockRts);
    const min = Math.min(...blockRts);
    updateBest(STORAGE_KEY, med, 'min');
    paintBest();
    appendSession(TOOL_KEY, { median: med, mean: mn, sd, min, n: blockRts.length });
    paintSessions();
    summaryEl.textContent = `本组：中位 ${Math.round(med)} ms · 均值 ${Math.round(mn)} · 标准差 ${Math.round(sd)} · 最快 ${Math.round(min)} ms`;
    setPhase('blockDone', `${Math.round(med)} ms\n（组中位）`);
    startBtn.textContent = '再来一组';
    startBtn.disabled = false;
  }

  async function startBlock() {
    if (phase !== 'idle' && phase !== 'blockDone') return;
    blockRts = [];
    trialInBlock = 0;
    startBtn.disabled = true;
    setPhase('countdown', '3');
    await runCountdownAsync(3, (n) => setPhase('countdown', String(n)));
    armTrial();
  }

  function onTap() {
    if (phase === 'idle' || phase === 'blockDone') {
      void startBlock();
      return;
    }
    if (phase === 'countdown') return;
    if (phase === 'wait') {
      clearTimeout(timer);
      setPhase('tooSoon', '太早！本轮不计入，点击继续');
      phase = 'tooSoon';
      return;
    }
    if (phase === 'tooSoon') {
      armTrial();
      return;
    }
    if (phase === 'go') {
      const rt = performance.now() - goAt;
      blockRts.push(rt);
      trialInBlock += 1;
      if (trialInBlock >= TRIALS_PER_BLOCK) {
        finishBlock();
      } else {
        setPhase('wait', `${Math.round(rt)} ms\n准备下一次…`);
        window.setTimeout(armTrial, 600);
      }
    }
  }

  stage.addEventListener('click', onTap);
  startBtn.addEventListener('click', () => void startBlock());
  bindKeys({ ' ': onTap, enter: onTap });
  setPhase('idle', '点击或按 Space 开始一组（6 次有效试次）');
  paintBest();
  paintSessions();
  summaryEl.textContent = '';
}
