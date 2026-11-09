import { loadJson, saveJson } from '../shared/storage';
import { appendSession } from '../shared/sessionLog';
import { pageLocaleFromDocument } from '../../i18n/locale-dom';
import { getToolMessages } from '../../i18n/tool-messages';

type Phase = 'focus' | 'break' | 'longBreak';

type Settings = {
  focusMin: number;
  breakMin: number;
  longBreakMin: number;
  cycles: number;
  longBreakEvery: number;
  sound: boolean;
  longBreakEnabled: boolean;
};

const STORAGE_KEY = 'bth:focus-timer:settings';
const TOOL_KEY = 'focus';

function beep(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.frequency.value = 660;
    g.gain.value = 0.08;
    o.start();
    setTimeout(() => {
      o.stop();
      void ctx.close();
    }, 120);
  } catch {
    // ignore
  }
}

export function initFocusTimer(root: HTMLElement): void {
  const m = getToolMessages(pageLocaleFromDocument()).focus;
  const baseTitle = document.title || 'BrainTrainLab';
  const timeEl = root.querySelector<HTMLElement>('[data-time]')!;
  const phaseEl = root.querySelector<HTMLElement>('[data-phase]')!;
  const cycleEl = root.querySelector<HTMLElement>('[data-cycle]')!;
  const feedback = root.querySelector<HTMLElement>('[data-feedback]')!;
  const startBtn = root.querySelector<HTMLButtonElement>('[data-start]')!;
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-pause]')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-reset]')!;
  const focusInput = root.querySelector<HTMLInputElement>('[data-focus-min]')!;
  const breakInput = root.querySelector<HTMLInputElement>('[data-break-min]')!;
  const longBreakInput = root.querySelector<HTMLInputElement>('[data-long-break-min]')!;
  const cyclesInput = root.querySelector<HTMLInputElement>('[data-cycles]')!;
  const soundInput = root.querySelector<HTMLInputElement>('[data-sound]')!;
  const longBreakInputToggle = root.querySelector<HTMLInputElement>('[data-long-break]')!;

  const saved = loadJson<Settings>(STORAGE_KEY, {
    focusMin: 25,
    breakMin: 5,
    longBreakMin: 15,
    cycles: 4,
    longBreakEvery: 4,
    sound: true,
    longBreakEnabled: false,
  });
  focusInput.value = String(saved.focusMin);
  breakInput.value = String(saved.breakMin);
  longBreakInput.value = String(saved.longBreakMin);
  cyclesInput.value = String(saved.cycles);
  if (soundInput) soundInput.checked = saved.sound;
  if (longBreakInputToggle) longBreakInputToggle.checked = saved.longBreakEnabled;

  let phase: Phase = 'focus';
  let remainMs = saved.focusMin * 60_000;
  let cycle = 1;
  let focusCompletedInBlock = 0;
  let running = false;
  let lastTs = 0;
  let raf = 0;
  let wasRunningBeforeHide = false;

  function settings(): Settings {
    return {
      focusMin: Math.max(1, Number(focusInput.value) || 25),
      breakMin: Math.max(1, Number(breakInput.value) || 5),
      longBreakMin: Math.max(1, Number(longBreakInput?.value) || 15),
      cycles: Math.max(1, Number(cyclesInput.value) || 4),
      longBreakEvery: 4,
      sound: soundInput?.checked ?? true,
      longBreakEnabled: longBreakInputToggle?.checked ?? false,
    };
  }

  function persist() {
    saveJson(STORAGE_KEY, settings());
  }

  function format(ms: number) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function phaseLabel() {
    if (phase === 'focus') return m.phaseFocus;
    if (phase === 'break') return m.phaseBreak;
    return m.phaseLong;
  }

  function updateTitle() {
    if (!running) {
      document.title = baseTitle;
      return;
    }
    document.title = `${format(remainMs)} · ${phaseLabel()} · BrainTrainLab`;
  }

  function paint() {
    timeEl.textContent = format(remainMs);
    phaseEl.textContent = phaseLabel();
    cycleEl.textContent = m.cycleOf(cycle, settings().cycles);
    updateTitle();
  }

  function switchPhase() {
    const s = settings();
    beep(s.sound);

    if (phase === 'focus') {
      focusCompletedInBlock += 1;
      if (cycle >= s.cycles) {
        running = false;
        appendSession(TOOL_KEY, { cyclesDone: s.cycles, totalMin: s.focusMin * s.cycles });
        feedback.textContent = m.done;
        feedback.className = 'tool-feedback is-ok';
        startBtn.textContent = m.again;
        phase = 'focus';
        remainMs = s.focusMin * 60_000;
        cycle = 1;
        focusCompletedInBlock = 0;
        paint();
        document.title = baseTitle;
        return;
      }

      if (s.longBreakEnabled && focusCompletedInBlock % s.longBreakEvery === 0) {
        phase = 'longBreak';
        remainMs = s.longBreakMin * 60_000;
        feedback.textContent = m.longBreak;
      } else {
        phase = 'break';
        remainMs = s.breakMin * 60_000;
        feedback.textContent = m.shortBreak;
      }
      feedback.className = 'tool-feedback';
    } else {
      cycle += 1;
      phase = 'focus';
      remainMs = s.focusMin * 60_000;
      feedback.textContent = m.beginFocus(cycle);
      feedback.className = 'tool-feedback is-ok';
    }
    paint();
  }

  function frame(ts: number) {
    if (!running) return;
    if (!lastTs) lastTs = ts;
    const delta = ts - lastTs;
    lastTs = ts;
    remainMs -= delta;
    if (remainMs <= 0) {
      remainMs = 0;
      paint();
      switchPhase();
      if (running) {
        lastTs = 0;
        raf = requestAnimationFrame(frame);
      }
      return;
    }
    paint();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    persist();
    if (!running) {
      running = true;
      lastTs = 0;
      startBtn.textContent = m.running;
      pauseBtn.textContent = m.pause;
      feedback.textContent = phase === 'focus' ? m.deepWork : phaseLabel();
      feedback.className = 'tool-feedback';
      raf = requestAnimationFrame(frame);
    }
  }

  function pause() {
    if (!running) {
      start();
      return;
    }
    running = false;
    cancelAnimationFrame(raf);
    pauseBtn.textContent = m.resume;
    startBtn.textContent = m.paused;
    feedback.textContent = m.pausedMsg;
    document.title = baseTitle;
  }

  function reset() {
    running = false;
    cancelAnimationFrame(raf);
    const s = settings();
    persist();
    phase = 'focus';
    cycle = 1;
    focusCompletedInBlock = 0;
    remainMs = s.focusMin * 60_000;
    startBtn.textContent = m.start;
    pauseBtn.textContent = m.pause;
    feedback.textContent = m.idleHint;
    feedback.className = 'tool-feedback';
    document.title = baseTitle;
    paint();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && running) {
      wasRunningBeforeHide = true;
      pause();
      feedback.textContent = m.bgPause;
    }
  });

  startBtn.addEventListener('click', start);
  pauseBtn.addEventListener('click', pause);
  resetBtn.addEventListener('click', reset);
  [focusInput, breakInput, longBreakInput, cyclesInput, soundInput, longBreakInputToggle].forEach((el) => {
    el?.addEventListener('change', () => {
      if (!running) reset();
      else persist();
    });
  });

  reset();
  void wasRunningBeforeHide;
}
