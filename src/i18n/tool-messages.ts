import type { Locale } from './types';

export type StroopColor = { name: string; css: string; key: string };

export type ToolMessages = {
  recentSessions: string;
  schulte: {
    proTitle: string;
    proDesc: string;
    proLink: string;
    size: string;
    startSpace: string;
    time: string;
    errors: string;
    next: string;
    gridAria: string;
    prep: string;
    preparing: string;
    inProgress: string;
    find: (n: number) => string;
    complete: (time: string, err: number) => string;
    again: string;
  };
  reaction: {
    startBlock: string;
    bestMedian: string;
    stageAria: string;
    idle: string;
    wait: (n: number, total: number) => string;
    go: string;
    tooSoon: string;
    blockDone: (med: number) => string;
    summary: (med: number, mean: number, sd: number, min: number) => string;
    rt: (ms: number) => string;
    again: string;
    sessionLine: (time: string, med: number) => string;
  };
  nback: {
    trials: string;
    progress: string;
    score: string;
    match: string;
    mismatch: string;
    intro: string;
    warmup: (i: number, n: number) => string;
    prompt: string;
    correct: string;
    wrongMatch: string;
    wrongMismatch: string;
    timeoutMatch: string;
    timeoutOk: string;
    running: string;
    again: string;
    finish: (acc: number, correct: number, answered: number) => string;
    detail: (h: number, m: number, f: number, cr: number) => string;
  };
  stroop: {
    trials: string;
    time: string;
    bestAccuracy: string;
    inkWord: string;
    pickInk: string;
    ready: string;
    running: string;
    wrong: (ink: string) => string;
    done: (acc: number) => string;
    effect: (ms: number) => string;
    effectNa: string;
    sessionLine: (time: string, acc: number, fx: number) => string;
    again: string;
  };
  focus: {
    focusMin: string;
    breakMin: string;
    longBreakMin: string;
    cycles: string;
    phaseStat: string;
    cycleStat: string;
    sound: string;
    longEvery4: string;
    phaseFocus: string;
    phaseBreak: string;
    phaseLong: string;
    cycleOf: (c: number, total: number) => string;
    tabHint: string;
    start: string;
    pause: string;
    resume: string;
    reset: string;
    running: string;
    paused: string;
    pausedMsg: string;
    bgPause: string;
    beginFocus: (cycle: number) => string;
    shortBreak: string;
    longBreak: string;
    deepWork: string;
    done: string;
    again: string;
    idleHint: string;
  };
  stroopColors: StroopColor[];
};

const messages: Record<Locale, ToolMessages> = {
  zh: {
    recentSessions: '最近记录',
    schulte: {
      proTitle: '需要专业级舒尔特训练？',
      proDesc: '本站为轻量练习版。毫秒级计时、多模式、红黑舒尔特与打印套件请前往专业「舒尔特方格」站。',
      proLink: '舒尔特方格 · schultetable.pro',
      size: '规格',
      startSpace: '开始（Space）',
      time: '用时',
      errors: '错误',
      next: '下一个：',
      gridAria: '舒尔特方格',
      prep: '注视网格中心，用余光定位数字。先求少错，再求更快。',
      preparing: '准备…',
      inProgress: '进行中…',
      find: (n) => `请找 ${n}`,
      complete: (time, err) => `完成！用时 ${time}，错误 ${err} 次。需要毫秒级计时与进阶模式？见上方专业舒尔特链接。`,
      again: '再来一轮',
    },
    reaction: {
      startBlock: '开始一组（6 次）',
      bestMedian: '最佳中位',
      stageAria: '反应时测试区域',
      idle: '点击或按 Space 开始一组（6 次有效试次）',
      wait: (n, t) => `试次 ${n}/${t}\n等待变绿…`,
      go: '点击！',
      tooSoon: '太早！本轮不计入，点击继续',
      blockDone: (med) => `${Math.round(med)} ms\n（组中位）`,
      summary: (med, mean, sd, min) =>
        `本组：中位 ${Math.round(med)} ms · 均值 ${Math.round(mean)} · 标准差 ${Math.round(sd)} · 最快 ${Math.round(min)} ms`,
      rt: (ms) => `${Math.round(ms)} ms\n准备下一次…`,
      again: '再来一组',
      sessionLine: (time, med) => `${time} · 中位 ${Math.round(med)} ms`,
    },
    nback: {
      trials: '试次',
      progress: '进度',
      score: '得分',
      match: '相同 (F)',
      mismatch: '不同 (J)',
      intro: '选择 N 与试次数后开始。F=相同，J=不同。',
      warmup: (i, n) => `预热 ${i + 1}/${n}`,
      prompt: '是否与 N 步之前相同？（F 相同 / J 不同）',
      correct: '正确',
      wrongMatch: '应为「相同」',
      wrongMismatch: '应为「不同」',
      timeoutMatch: '漏答（应为相同）',
      timeoutOk: '超时（视为不同，正确）',
      running: '进行中…',
      again: '再来一组',
      finish: (acc, correct, answered) => `结束：正确率 ${acc.toFixed(0)}%（${correct}/${answered}）`,
      detail: (h, m, f, cr) => `命中 ${h} · 漏答 ${m} · 虚警 ${f} · 正确拒绝 ${cr}`,
    },
    stroop: {
      trials: '试次',
      time: '用时',
      bestAccuracy: '最佳正确率',
      inkWord: '字色',
      pickInk: '按数字键或按钮选择墨水颜色',
      ready: '准备…',
      running: '进行中…',
      wrong: (ink) => `错误，应为「${ink}」`,
      done: (acc) => `完成：正确率 ${acc.toFixed(0)}%`,
      effect: (ms) => `冲突效应（科普）：不一致均 RT − 一致均 RT ≈ ${Math.round(ms)} ms（越大表示字义干扰越明显）`,
      effectNa: '有效 RT 不足，无法估算冲突效应',
      sessionLine: (time, acc, fx) => `${time} · ${acc}% · 冲突效应 +${Math.round(fx)}ms`,
      again: '再来一组',
    },
    focus: {
      focusMin: '专注（分钟）',
      breakMin: '休息（分钟）',
      longBreakMin: '长休息（分钟）',
      cycles: '循环次数',
      phaseStat: '阶段',
      cycleStat: '循环',
      sound: '阶段提示音',
      longEvery4: '每 4 段专注加长休息',
      phaseFocus: '专注中',
      phaseBreak: '短休息',
      phaseLong: '长休息',
      cycleOf: (c, t) => `${c} / ${t}`,
      tabHint: '倒计时同步到浏览器标签标题',
      start: '开始',
      pause: '暂停',
      resume: '继续',
      reset: '重置',
      running: '进行中…',
      paused: '已暂停',
      pausedMsg: '已暂停',
      bgPause: '页面进入后台，已自动暂停。',
      beginFocus: (c) => `开始第 ${c} 段专注`,
      shortBreak: '短休息：离开屏幕更好。',
      longBreak: '长休息：离开屏幕走动或伸展。',
      deepWork: '屏蔽通知，只做一件事。',
      done: '本轮会话完成。记录一次真实深工，比多刷训练更重要。',
      again: '再开一轮',
      idleHint: '设定时长后开始。建议先 15–25 分钟。',
    },
    stroopColors: [
      { name: '红', css: '#b91c1c', key: '1' },
      { name: '绿', css: '#047857', key: '2' },
      { name: '蓝', css: '#1d4ed8', key: '3' },
      { name: '黄', css: '#a16207', key: '4' },
    ],
  },
  en: {
    recentSessions: 'Recent sessions',
    schulte: {
      proTitle: 'Need pro-level Schulte training?',
      proDesc: 'This site is a lite build. Millisecond timing, modes, and print kits live on Schulte Table Pro.',
      proLink: 'Schulte table · schultetable.pro',
      size: 'Grid',
      startSpace: 'Start (Space)',
      time: 'Time',
      errors: 'Errors',
      next: 'Next:',
      gridAria: 'Schulte table',
      prep: 'Fixate the center; scan with peripheral vision. Accuracy before speed.',
      preparing: 'Get ready…',
      inProgress: 'Running…',
      find: (n) => `Find ${n}`,
      complete: (time, err) => `Done in ${time}, ${err} error(s). For ms timing and advanced modes, use the Pro link above.`,
      again: 'Another round',
    },
    reaction: {
      startBlock: 'Start block (6 trials)',
      bestMedian: 'Best median',
      stageAria: 'Reaction time test area',
      idle: 'Click or press Space to start (6 valid trials)',
      wait: (n, t) => `Trial ${n}/${t}\nWait for green…`,
      go: 'Click!',
      tooSoon: 'Too soon! Foul—click to continue',
      blockDone: (med) => `${Math.round(med)} ms\n(block median)`,
      summary: (med, mean, sd, min) =>
        `Block: median ${Math.round(med)} ms · mean ${Math.round(mean)} · SD ${Math.round(sd)} · fastest ${Math.round(min)} ms`,
      rt: (ms) => `${Math.round(ms)} ms\nGet ready…`,
      again: 'Another block',
      sessionLine: (time, med) => `${time} · median ${Math.round(med)} ms`,
    },
    nback: {
      trials: 'Trials',
      progress: 'Progress',
      score: 'Score',
      match: 'Match (F)',
      mismatch: 'No match (J)',
      intro: 'Pick N and trial count. F = match, J = no match.',
      warmup: (i, n) => `Warm-up ${i + 1}/${n}`,
      prompt: 'Same as N steps ago? (F = match / J = no match)',
      correct: 'Correct',
      wrongMatch: 'Should be match',
      wrongMismatch: 'Should be no match',
      timeoutMatch: 'Miss (should match)',
      timeoutOk: 'Timeout (counted as no match, correct)',
      running: 'Running…',
      again: 'Another block',
      finish: (acc, correct, answered) => `Done: ${acc.toFixed(0)}% (${correct}/${answered})`,
      detail: (h, m, f, cr) => `Hits ${h} · misses ${m} · false alarms ${f} · correct rejects ${cr}`,
    },
    stroop: {
      trials: 'Trials',
      time: 'Time',
      bestAccuracy: 'Best accuracy',
      inkWord: 'Ink',
      pickInk: 'Pick ink color with keys or buttons',
      ready: 'Ready…',
      running: 'Running…',
      wrong: (ink) => `Wrong—ink was “${ink}”`,
      done: (acc) => `Done: ${acc.toFixed(0)}% correct`,
      effect: (ms) => `Stroop effect (edu): incongruent RT − congruent RT ≈ ${Math.round(ms)} ms`,
      effectNa: 'Not enough valid RTs to estimate conflict effect',
      sessionLine: (time, acc, fx) => `${time} · ${acc}% · conflict +${Math.round(fx)} ms`,
      again: 'Another block',
    },
    focus: {
      focusMin: 'Focus (min)',
      breakMin: 'Break (min)',
      longBreakMin: 'Long break (min)',
      cycles: 'Cycles',
      phaseStat: 'Phase',
      cycleStat: 'Cycle',
      sound: 'Phase chime',
      longEvery4: 'Long break every 4 focus blocks',
      phaseFocus: 'Focus',
      phaseBreak: 'Short break',
      phaseLong: 'Long break',
      cycleOf: (c, t) => `${c} / ${t}`,
      tabHint: 'Countdown also shows in the tab title',
      start: 'Start',
      pause: 'Pause',
      resume: 'Resume',
      reset: 'Reset',
      running: 'Running…',
      paused: 'Paused',
      pausedMsg: 'Paused',
      bgPause: 'Tab hidden—auto-paused.',
      beginFocus: (c) => `Focus block ${c}`,
      shortBreak: 'Short break: step away from the screen.',
      longBreak: 'Long break: walk or stretch.',
      deepWork: 'Block notifications; one task only.',
      done: 'Session complete. Do one piece of real deep work next.',
      again: 'Start again',
      idleHint: 'Set durations and start. Try 15–25 minutes first.',
    },
    stroopColors: [
      { name: 'Red', css: '#b91c1c', key: '1' },
      { name: 'Green', css: '#047857', key: '2' },
      { name: 'Blue', css: '#1d4ed8', key: '3' },
      { name: 'Yellow', css: '#a16207', key: '4' },
    ],
  },
  es: {
    recentSessions: 'Sesiones recientes',
    schulte: {
      proTitle: '¿Entrenamiento Schulte profesional?',
      proDesc: 'Versión ligera aquí. Tiempo al ms y modos avanzados en Schulte Table Pro.',
      proLink: 'Tabla Schulte · schultetable.pro',
      size: 'Cuadrícula',
      startSpace: 'Iniciar (Espacio)',
      time: 'Tiempo',
      errors: 'Errores',
      next: 'Siguiente:',
      gridAria: 'Tabla Schulte',
      prep: 'Fija el centro; usa visión periférica. Precisión antes que velocidad.',
      preparing: 'Preparar…',
      inProgress: 'En curso…',
      find: (n) => `Busca ${n}`,
      complete: (time, err) => `Listo: ${time}, ${err} error(es). Para ms y modos Pro, enlace arriba.`,
      again: 'Otra ronda',
    },
    reaction: {
      startBlock: 'Iniciar bloque (6 ensayos)',
      bestMedian: 'Mejor mediana',
      stageAria: 'Zona de tiempo de reacción',
      idle: 'Clic o Espacio para empezar (6 ensayos válidos)',
      wait: (n, t) => `Ensayo ${n}/${t}\nEspera verde…`,
      go: '¡Clic!',
      tooSoon: '¡Muy pronto! Falta—clic para seguir',
      blockDone: (med) => `${Math.round(med)} ms\n(mediana del bloque)`,
      summary: (med, mean, sd, min) =>
        `Bloque: mediana ${Math.round(med)} ms · media ${Math.round(mean)} · DE ${Math.round(sd)} · mín ${Math.round(min)} ms`,
      rt: (ms) => `${Math.round(ms)} ms\nPrepara…`,
      again: 'Otro bloque',
      sessionLine: (time, med) => `${time} · mediana ${Math.round(med)} ms`,
    },
    nback: {
      trials: 'Ensayos',
      progress: 'Progreso',
      score: 'Puntuación',
      match: 'Igual (F)',
      mismatch: 'Distinto (J)',
      intro: 'Elige N y ensayos. F = igual, J = distinto.',
      warmup: (i, n) => `Calentamiento ${i + 1}/${n}`,
      prompt: '¿Igual que hace N pasos? (F = igual / J = distinto)',
      correct: 'Correcto',
      wrongMatch: 'Debía ser igual',
      wrongMismatch: 'Debía ser distinto',
      timeoutMatch: 'Fallo (debía ser igual)',
      timeoutOk: 'Tiempo agotado (distinto, correcto)',
      running: 'En curso…',
      again: 'Otro bloque',
      finish: (acc, correct, answered) => `Fin: ${acc.toFixed(0)}% (${correct}/${answered})`,
      detail: (h, m, f, cr) => `Aciertos ${h} · fallos ${m} · falsas alarmas ${f} · rechazos ${cr}`,
    },
    stroop: {
      trials: 'Ensayos',
      time: 'Tiempo',
      bestAccuracy: 'Mejor precisión',
      inkWord: 'Tinta',
      pickInk: 'Elige color de tinta con teclas o botones',
      ready: 'Listo…',
      running: 'En curso…',
      wrong: (ink) => `Error—tinta «${ink}»`,
      done: (acc) => `Fin: ${acc.toFixed(0)}% aciertos`,
      effect: (ms) => `Efecto Stroop: RT incongruente − congruente ≈ ${Math.round(ms)} ms`,
      effectNa: 'RT insuficientes para estimar conflicto',
      sessionLine: (time, acc, fx) => `${time} · ${acc}% · conflicto +${Math.round(fx)} ms`,
      again: 'Otro bloque',
    },
    focus: {
      focusMin: 'Foco (min)',
      breakMin: 'Descanso (min)',
      longBreakMin: 'Descanso largo (min)',
      cycles: 'Ciclos',
      phaseStat: 'Fase',
      cycleStat: 'Ciclo',
      sound: 'Sonido de fase',
      longEvery4: 'Descanso largo cada 4 bloques',
      phaseFocus: 'Foco',
      phaseBreak: 'Descanso corto',
      phaseLong: 'Descanso largo',
      cycleOf: (c, t) => `${c} / ${t}`,
      tabHint: 'Cuenta atrás también en el título de la pestaña',
      start: 'Iniciar',
      pause: 'Pausa',
      resume: 'Reanudar',
      reset: 'Reiniciar',
      running: 'En curso…',
      paused: 'Pausado',
      pausedMsg: 'Pausado',
      bgPause: 'Pestaña oculta—pausa automática.',
      beginFocus: (c) => `Bloque de foco ${c}`,
      shortBreak: 'Descanso corto: aleja la pantalla.',
      longBreak: 'Descanso largo: camina o estira.',
      deepWork: 'Silencia avisos; una sola tarea.',
      done: 'Sesión lista. Haz un trabajo profundo real.',
      again: 'Otra vez',
      idleHint: 'Ajusta tiempos e inicia. Prueba 15–25 min.',
    },
    stroopColors: [
      { name: 'Rojo', css: '#b91c1c', key: '1' },
      { name: 'Verde', css: '#047857', key: '2' },
      { name: 'Azul', css: '#1d4ed8', key: '3' },
      { name: 'Amarillo', css: '#a16207', key: '4' },
    ],
  },
  ja: {
    recentSessions: '最近のセッション',
    schulte: {
      proTitle: 'プロ級シュルテが必要？',
      proDesc: '当サイトは軽量版。ミリ秒計測・多モードは schultetable.pro へ。',
      proLink: 'シュルテ · schultetable.pro',
      size: 'サイズ',
      startSpace: '開始（Space）',
      time: '時間',
      errors: 'ミス',
      next: '次：',
      gridAria: 'シュルテ表',
      prep: '中心を見て余光で探す。速さより正確さ。',
      preparing: '準備…',
      inProgress: '実行中…',
      find: (n) => `${n} を探す`,
      complete: (time, err) => `完了 ${time}、ミス ${err}。Pro は上のリンクへ。`,
      again: 'もう一周',
    },
    reaction: {
      startBlock: '開始（6 試行）',
      bestMedian: 'ベスト中央値',
      stageAria: '反応時間テスト',
      idle: 'クリックまたは Space で開始（6 試行）',
      wait: (n, t) => `試行 ${n}/${t}\n緑を待つ…`,
      go: 'クリック！',
      tooSoon: '早すぎ！不正—クリックで続行',
      blockDone: (med) => `${Math.round(med)} ms\n（中央値）`,
      summary: (med, mean, sd, min) =>
        `ブロック：中央値 ${Math.round(med)} ms・平均 ${Math.round(mean)}・SD ${Math.round(sd)}・最速 ${Math.round(min)} ms`,
      rt: (ms) => `${Math.round(ms)} ms\n次へ…`,
      again: 'もう一組',
      sessionLine: (time, med) => `${time} · 中央値 ${Math.round(med)} ms`,
    },
    nback: {
      trials: '試行',
      progress: '進捗',
      score: 'スコア',
      match: '同じ (F)',
      mismatch: '違う (J)',
      intro: 'N と試行数を選んで開始。F=同じ、J=違う。',
      warmup: (i, n) => `ウォームアップ ${i + 1}/${n}`,
      prompt: 'N 手前と同じ？（F 同じ / J 違う）',
      correct: '正解',
      wrongMatch: '「同じ」が正解',
      wrongMismatch: '「違う」が正解',
      timeoutMatch: '見逃し（同じ）',
      timeoutOk: '時間切れ（違うとして正解）',
      running: '実行中…',
      again: 'もう一組',
      finish: (acc, correct, answered) => `終了：正答率 ${acc.toFixed(0)}%（${correct}/${answered}）`,
      detail: (h, m, f, cr) => `命中 ${h}・見逃し ${m}・誤警報 ${f}・正拒否 ${cr}`,
    },
    stroop: {
      trials: '試行',
      time: '時間',
      bestAccuracy: 'ベスト正答率',
      inkWord: 'インク',
      pickInk: '数字キーまたはボタンで色を選択',
      ready: '準備…',
      running: '実行中…',
      wrong: (ink) => `誤り—正解は「${ink}」`,
      done: (acc) => `完了：正答率 ${acc.toFixed(0)}%`,
      effect: (ms) => `ストループ効果：不一致RT − 一致RT ≈ ${Math.round(ms)} ms`,
      effectNa: 'RT不足のため効果を算出できません',
      sessionLine: (time, acc, fx) => `${time} · ${acc}% · 効果 +${Math.round(fx)} ms`,
      again: 'もう一組',
    },
    focus: {
      focusMin: '集中（分）',
      breakMin: '休息（分）',
      longBreakMin: '長休息（分）',
      cycles: 'サイクル',
      phaseStat: 'フェーズ',
      cycleStat: 'サイクル',
      sound: 'フェーズ音',
      longEvery4: '4集中ごとに長休息',
      phaseFocus: '集中中',
      phaseBreak: '短休息',
      phaseLong: '長休息',
      cycleOf: (c, t) => `${c} / ${t}`,
      tabHint: 'タブタイトルにも残り時間',
      start: '開始',
      pause: '一時停止',
      resume: '再開',
      reset: 'リセット',
      running: '実行中…',
      paused: '一時停止中',
      pausedMsg: '一時停止',
      bgPause: 'バックグラウンドで自動一時停止。',
      beginFocus: (c) => `集中フェーズ ${c}`,
      shortBreak: '短い休憩：画面から離れる。',
      longBreak: '長い休憩：歩くかストレッチ。',
      deepWork: '通知オフ。一つのことだけ。',
      done: '完了。本物の深い作業を一つ。',
      again: 'もう一度',
      idleHint: '時間を設定して開始。15–25分から。',
    },
    stroopColors: [
      { name: '赤', css: '#b91c1c', key: '1' },
      { name: '緑', css: '#047857', key: '2' },
      { name: '青', css: '#1d4ed8', key: '3' },
      { name: '黄', css: '#a16207', key: '4' },
    ],
  },
  ko: {
    recentSessions: '최근 세션',
    schulte: {
      proTitle: '프로 슐테 훈련이 필요하신가요?',
      proDesc: '여기는 경량판입니다. ms 타이밍·고급 모드는 schultetable.pro.',
      proLink: '슐테 · schultetable.pro',
      size: '격자',
      startSpace: '시작 (Space)',
      time: '시간',
      errors: '오류',
      next: '다음:',
      gridAria: '슐테 표',
      prep: '중앙을 보고 주변시로 찾으세요. 속도보다 정확도.',
      preparing: '준비…',
      inProgress: '진행 중…',
      find: (n) => `${n} 찾기`,
      complete: (time, err) => `완료 ${time}, 오류 ${err}. Pro 링크 참고.`,
      again: '다시',
    },
    reaction: {
      startBlock: '시작 (6회)',
      bestMedian: '최고 중앙값',
      stageAria: '반응시 테스트',
      idle: '클릭 또는 Space로 시작 (6회)',
      wait: (n, t) => `시행 ${n}/${t}\n초록 대기…`,
      go: '클릭!',
      tooSoon: '너무 빠름! 반칙—클릭 계속',
      blockDone: (med) => `${Math.round(med)} ms\n(중앙값)`,
      summary: (med, mean, sd, min) =>
        `블록: 중앙값 ${Math.round(med)} ms · 평균 ${Math.round(mean)} · SD ${Math.round(sd)} · 최속 ${Math.round(min)} ms`,
      rt: (ms) => `${Math.round(ms)} ms\n다음…`,
      again: '다시',
      sessionLine: (time, med) => `${time} · 중앙값 ${Math.round(med)} ms`,
    },
    nback: {
      trials: '시행',
      progress: '진행',
      score: '점수',
      match: '같음 (F)',
      mismatch: '다름 (J)',
      intro: 'N과 시행 수 선택. F=같음, J=다름.',
      warmup: (i, n) => `예열 ${i + 1}/${n}`,
      prompt: 'N단계 전과 같나요? (F 같음 / J 다름)',
      correct: '정답',
      wrongMatch: '「같음」이 정답',
      wrongMismatch: '「다름」이 정답',
      timeoutMatch: '누락 (같음)',
      timeoutOk: '시간 초과 (다름, 정답)',
      running: '진행 중…',
      again: '다시',
      finish: (acc, correct, answered) => `종료: 정답률 ${acc.toFixed(0)}% (${correct}/${answered})`,
      detail: (h, m, f, cr) => `적중 ${h} · 누락 ${m} · 오경보 ${f} · 정거부 ${cr}`,
    },
    stroop: {
      trials: '시행',
      time: '시간',
      bestAccuracy: '최고 정답률',
      inkWord: '잉크',
      pickInk: '숫자 키 또는 버튼으로 색 선택',
      ready: '준비…',
      running: '진행 중…',
      wrong: (ink) => `오답—정답 「${ink}」`,
      done: (acc) => `완료: 정답률 ${acc.toFixed(0)}%`,
      effect: (ms) => `스트룹 효과: 불일치 RT − 일치 RT ≈ ${Math.round(ms)} ms`,
      effectNa: 'RT 부족으로 효과 추정 불가',
      sessionLine: (time, acc, fx) => `${time} · ${acc}% · 효과 +${Math.round(fx)} ms`,
      again: '다시',
    },
    focus: {
      focusMin: '집중 (분)',
      breakMin: '휴식 (분)',
      longBreakMin: '긴 휴식 (분)',
      cycles: '사이클',
      phaseStat: '단계',
      cycleStat: '사이클',
      sound: '단계 알림음',
      longEvery4: '집중 4회마다 긴 휴식',
      phaseFocus: '집중',
      phaseBreak: '짧은 휴식',
      phaseLong: '긴 휴식',
      cycleOf: (c, t) => `${c} / ${t}`,
      tabHint: '탭 제목에도 카운트다운',
      start: '시작',
      pause: '일시정지',
      resume: '계속',
      reset: '초기화',
      running: '진행 중…',
      paused: '일시정지됨',
      pausedMsg: '일시정지',
      bgPause: '백그라운드에서 자동 일시정지.',
      beginFocus: (c) => `집중 ${c}단계`,
      shortBreak: '짧은 휴식: 화면에서 떠나기.',
      longBreak: '긴 휴식: 걷거나 스트레칭.',
      deepWork: '알림 끄기. 한 가지 일만.',
      done: '세션 완료. 진짜 깊은 작업 한 가지.',
      again: '다시 시작',
      idleHint: '시간 설정 후 시작. 15–25분 권장.',
    },
    stroopColors: [
      { name: '빨강', css: '#b91c1c', key: '1' },
      { name: '초록', css: '#047857', key: '2' },
      { name: '파랑', css: '#1d4ed8', key: '3' },
      { name: '노랑', css: '#a16207', key: '4' },
    ],
  },
  ru: {
    recentSessions: 'Недавние сессии',
    schulte: {
      proTitle: 'Нужен профессиональный Шульте?',
      proDesc: 'Здесь лёгкая версия. Мс и режимы — на schultetable.pro.',
      proLink: 'Шульте · schultetable.pro',
      size: 'Сетка',
      startSpace: 'Старт (Пробел)',
      time: 'Время',
      errors: 'Ошибки',
      next: 'Далее:',
      gridAria: 'Таблица Шульте',
      prep: 'Смотрите в центр, ищите периферийно. Сначала точность.',
      preparing: 'Готово…',
      inProgress: 'Идёт…',
      find: (n) => `Найдите ${n}`,
      complete: (time, err) => `Готово: ${time}, ошибок ${err}. Pro — ссылка выше.`,
      again: 'Ещё раунд',
    },
    reaction: {
      startBlock: 'Старт (6 попыток)',
      bestMedian: 'Лучшая медиана',
      stageAria: 'Зона теста реакции',
      idle: 'Клик или Пробел — 6 попыток',
      wait: (n, t) => `Попытка ${n}/${t}\nЖдите зелёный…`,
      go: 'Жмите!',
      tooSoon: 'Слишком рано! Клик для продолжения',
      blockDone: (med) => `${Math.round(med)} ms\n(медиана)`,
      summary: (med, mean, sd, min) =>
        `Блок: медиана ${Math.round(med)} ms · среднее ${Math.round(mean)} · СО ${Math.round(sd)} · мин ${Math.round(min)} ms`,
      rt: (ms) => `${Math.round(ms)} ms\nДалее…`,
      again: 'Ещё блок',
      sessionLine: (time, med) => `${time} · медиана ${Math.round(med)} ms`,
    },
    nback: {
      trials: 'Попытки',
      progress: 'Прогресс',
      score: 'Счёт',
      match: 'Совпало (F)',
      mismatch: 'Не совпало (J)',
      intro: 'Выберите N и число попыток. F — да, J — нет.',
      warmup: (i, n) => `Разминка ${i + 1}/${n}`,
      prompt: 'Как N шагов назад? (F — да / J — нет)',
      correct: 'Верно',
      wrongMatch: 'Должно быть «совпало»',
      wrongMismatch: 'Должно быть «не совпало»',
      timeoutMatch: 'Пропуск (было совпадение)',
      timeoutOk: 'Таймаут (нет совпадения, верно)',
      running: 'Идёт…',
      again: 'Ещё блок',
      finish: (acc, correct, answered) => `Итог: ${acc.toFixed(0)}% (${correct}/${answered})`,
      detail: (h, m, f, cr) => `Попадания ${h} · пропуски ${m} · ложные ${f} · отказы ${cr}`,
    },
    stroop: {
      trials: 'Попытки',
      time: 'Время',
      bestAccuracy: 'Лучшая точность',
      inkWord: 'Цвет',
      pickInk: 'Выберите цвет чернил клавишами или кнопками',
      ready: 'Готово…',
      running: 'Идёт…',
      wrong: (ink) => `Ошибка — цвет «${ink}»`,
      done: (acc) => `Готово: ${acc.toFixed(0)}% верно`,
      effect: (ms) => `Эффект Струпа: несовм. RT − совм. ≈ ${Math.round(ms)} ms`,
      effectNa: 'Мало RT для оценки эффекта',
      sessionLine: (time, acc, fx) => `${time} · ${acc}% · конфликт +${Math.round(fx)} ms`,
      again: 'Ещё блок',
    },
    focus: {
      focusMin: 'Фокус (мин)',
      breakMin: 'Пауза (мин)',
      longBreakMin: 'Длинная пауза (мин)',
      cycles: 'Циклы',
      phaseStat: 'Фаза',
      cycleStat: 'Цикл',
      sound: 'Звук фазы',
      longEvery4: 'Длинная пауза каждые 4 фокуса',
      phaseFocus: 'Фокус',
      phaseBreak: 'Короткая пауза',
      phaseLong: 'Длинная пауза',
      cycleOf: (c, t) => `${c} / ${t}`,
      tabHint: 'Обратный отсчёт во вкладке',
      start: 'Старт',
      pause: 'Пауза',
      resume: 'Продолжить',
      reset: 'Сброс',
      running: 'Идёт…',
      paused: 'Пауза',
      pausedMsg: 'На паузе',
      bgPause: 'Вкладка скрыта — авто-пауза.',
      beginFocus: (c) => `Фокус-блок ${c}`,
      shortBreak: 'Короткая пауза: отойдите от экрана.',
      longBreak: 'Длинная: прогулка или растяжка.',
      deepWork: 'Без уведомлений — одна задача.',
      done: 'Сессия завершена. Сделайте реальную глубокую работу.',
      again: 'Снова',
      idleHint: 'Задайте длительность. Начните с 15–25 мин.',
    },
    stroopColors: [
      { name: 'Красный', css: '#b91c1c', key: '1' },
      { name: 'Зелёный', css: '#047857', key: '2' },
      { name: 'Синий', css: '#1d4ed8', key: '3' },
      { name: 'Жёлтый', css: '#a16207', key: '4' },
    ],
  },
};

export function getToolMessages(locale: Locale = 'zh'): ToolMessages {
  return messages[locale] ?? messages.en;
}
