export type ToolMeta = {
  slug: string;
  title: string;
  description: string;
  focus: string;
  path: string;
  order: number;
};

export const TOOLS: ToolMeta[] = [
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

export function getTool(slug: string) {
  return TOOLS.find((tool) => tool.slug === slug);
}
