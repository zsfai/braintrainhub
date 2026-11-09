import type { Locale } from '../i18n/types';
import { localePath } from '../i18n';

export type ToolMeta = {
  slug: string;
  title: string;
  description: string;
  focus: string;
  path: string;
  order: number;
};

const zh: ToolMeta[] = [
  {
    slug: 'schulte',
    title: '舒尔特方格',
    description: '在打乱数字网格中按序查找，训练视觉扫描与注意力广度。',
    focus: '注意力广度',
    path: '/tools/schulte/',
    order: 1,
  },
  {
    slug: 'reaction',
    title: '简单反应时',
    description: '信号出现后尽快响应，觉察警觉水平与反应稳定性。',
    focus: '警觉反应',
    path: '/tools/reaction/',
    order: 2,
  },
  {
    slug: 'n-back',
    title: 'N-Back 工作记忆',
    description: '判断当前刺激是否与 N 步之前相同，练习工作记忆更新。',
    focus: '工作记忆',
    path: '/tools/n-back/',
    order: 3,
  },
  {
    slug: 'stroop',
    title: '斯特鲁普',
    description: '字义与颜色冲突时做出正确选择，练习抑制控制。',
    focus: '抑制控制',
    path: '/tools/stroop/',
    order: 4,
  },
  {
    slug: 'focus-timer',
    title: '专注会话计时',
    description: '用可调节专注/休息节奏，重建可持续的深度工作时段。',
    focus: '节律重建',
    path: '/tools/focus-timer/',
    order: 5,
  },
];

const es: ToolMeta[] = [
  {
    slug: 'schulte',
    title: 'Tabla Schulte',
    description: 'Busca números en orden en una cuadrícula—escaneo visual y amplitud atencional.',
    focus: 'Amplitud atencional',
    path: '/tools/schulte/',
    order: 1,
  },
  {
    slug: 'reaction',
    title: 'Tiempo de reacción simple',
    description: 'Responde al aparecer la señal—alerta y estabilidad.',
    focus: 'Alerta',
    path: '/tools/reaction/',
    order: 2,
  },
  {
    slug: 'n-back',
    title: 'N-Back',
    description: '¿Coincide con N pasos atrás?—actualización de memoria de trabajo.',
    focus: 'Memoria de trabajo',
    path: '/tools/n-back/',
    order: 3,
  },
  {
    slug: 'stroop',
    title: 'Stroop',
    description: 'Elige el color de tinta cuando palabra y color chocan.',
    focus: 'Inhibición',
    path: '/tools/stroop/',
    order: 4,
  },
  {
    slug: 'focus-timer',
    title: 'Temporizador de foco',
    description: 'Ciclos de foco y descanso para ritmo de trabajo profundo.',
    focus: 'Ritmo',
    path: '/tools/focus-timer/',
    order: 5,
  },
];

const en: ToolMeta[] = [
  {
    slug: 'schulte',
    title: 'Schulte table',
    description: 'Find numbers in order on a shuffled table—visual scan and attention span.',
    focus: 'Attention span',
    path: '/tools/schulte/',
    order: 1,
  },
  {
    slug: 'reaction',
    title: 'Simple reaction time',
    description: 'Respond when the signal appears—alertness and stability.',
    focus: 'Alertness',
    path: '/tools/reaction/',
    order: 2,
  },
  {
    slug: 'n-back',
    title: 'N-Back',
    description: 'Judge if the current item matches N steps back—working memory updating.',
    focus: 'Working memory',
    path: '/tools/n-back/',
    order: 3,
  },
  {
    slug: 'stroop',
    title: 'Stroop',
    description: 'Pick ink color when word and color conflict—inhibition practice.',
    focus: 'Inhibition',
    path: '/tools/stroop/',
    order: 4,
  },
  {
    slug: 'focus-timer',
    title: 'Focus session timer',
    description: 'Adjustable focus/break cycles for deep work rhythm.',
    focus: 'Rhythm',
    path: '/tools/focus-timer/',
    order: 5,
  },
];

const ja: ToolMeta[] = [
  {
    slug: 'schulte',
    title: 'シュルテ表',
    description: '数字を順に探す—視覚スキャンと注意広度。',
    focus: '注意広度',
    path: '/tools/schulte/',
    order: 1,
  },
  {
    slug: 'reaction',
    title: '単純反応時間',
    description: '信号に素早く反応—覚醒と安定性。',
    focus: '覚醒',
    path: '/tools/reaction/',
    order: 2,
  },
  {
    slug: 'n-back',
    title: 'N-Back',
    description: 'N 手前と同じか判断—ワーキングメモリ更新。',
    focus: 'WM',
    path: '/tools/n-back/',
    order: 3,
  },
  {
    slug: 'stroop',
    title: 'ストループ',
    description: '字義と色の不一致でインク色を選ぶ—抑制。',
    focus: '抑制',
    path: '/tools/stroop/',
    order: 4,
  },
  {
    slug: 'focus-timer',
    title: '集中タイマー',
    description: '集中/休息サイクルで深い作業リズムを。',
    focus: 'リズム',
    path: '/tools/focus-timer/',
    order: 5,
  },
];

const ko: ToolMeta[] = [
  {
    slug: 'schulte',
    title: '슐테 표',
    description: '숫자를 순서대로 찾기—시각 스캔과 주의 범위.',
    focus: '주의 범위',
    path: '/tools/schulte/',
    order: 1,
  },
  {
    slug: 'reaction',
    title: '단순 반응시',
    description: '신호에 빠르게 반응—각성과 안정성.',
    focus: '각성',
    path: '/tools/reaction/',
    order: 2,
  },
  {
    slug: 'n-back',
    title: 'N-Back',
    description: 'N단계 전과 같은지 판단—작업기억 갱신.',
    focus: '작업기억',
    path: '/tools/n-back/',
    order: 3,
  },
  {
    slug: 'stroop',
    title: '스트룹',
    description: '글자와 색 충돌 시 잉크 색 선택—억제.',
    focus: '억제',
    path: '/tools/stroop/',
    order: 4,
  },
  {
    slug: 'focus-timer',
    title: '집중 타이머',
    description: '집중/휴식 주기로 깊은 작업 리듬.',
    focus: '리듬',
    path: '/tools/focus-timer/',
    order: 5,
  },
];

const ru: ToolMeta[] = [
  {
    slug: 'schulte',
    title: 'Таблица Шульте',
    description: 'Искать числа по порядку — зрительное сканирование.',
    focus: 'Внимание',
    path: '/tools/schulte/',
    order: 1,
  },
  {
    slug: 'reaction',
    title: 'Простое время реакции',
    description: 'Реагировать на сигнал — бодрствование и стабильность.',
    focus: 'Бодрствование',
    path: '/tools/reaction/',
    order: 2,
  },
  {
    slug: 'n-back',
    title: 'N-Back',
    description: 'Совпадение с N шагов назад — рабочая память.',
    focus: 'Рабочая память',
    path: '/tools/n-back/',
    order: 3,
  },
  {
    slug: 'stroop',
    title: 'Струп',
    description: 'Цвет чернил при конфликте слова и цвета.',
    focus: 'Торможение',
    path: '/tools/stroop/',
    order: 4,
  },
  {
    slug: 'focus-timer',
    title: 'Таймер фокуса',
    description: 'Циклы работы и пауз для глубокого фокуса.',
    focus: 'Ритм',
    path: '/tools/focus-timer/',
    order: 5,
  },
];

const byLocale: Record<Locale, ToolMeta[]> = { zh, en, es, ja, ko, ru };

export function getTools(locale: Locale): ToolMeta[] {
  return byLocale[locale].map((tool) => ({
    ...tool,
    path: localePath(locale, tool.path),
  }));
}

export function getTool(slug: string, locale: Locale): ToolMeta | undefined {
  return getTools(locale).find((t) => t.slug === slug);
}
