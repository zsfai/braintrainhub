import type { Locale } from './types';
import type { ContentKind } from '../lib/content';

type CollectionCopy = { title: string; description: string; lead: string; toolsDirectAnswer?: string };

const data: Record<ContentKind | 'tools', Record<Locale, CollectionCopy>> = {
  principles: {
    zh: {
      title: '原理科普',
      description: '用专业科普语言理解注意力、奖赏回路、认知负荷、工作记忆与节律——不做医疗承诺。',
      lead: '理解机制，才能选对练习。以下文章只做认知与行为科普，帮助你建立正确心智模型。',
    },
    en: {
      title: 'Principles',
      description: 'Attention, reward loops, load, working memory, and rhythm—education, not medicine.',
      lead: 'Understand the mechanisms, then pick drills with intent.',
    },
    es: {
      title: 'Principios',
      description: 'Atención, recompensa, carga, memoria de trabajo y ritmo—educación, no medicina.',
      lead: 'Entiende los mecanismos y elige ejercicios con intención.',
    },
    ja: {
      title: '原理',
      description: '注意・報酬・負荷・WM・リズムの解説（非医療）。',
      lead: '仕組みを理解してから練習を選ぶ。',
    },
    ko: {
      title: '원리',
      description: '주의, 보상, 부하, 작업기억, 리듬—교육 목적.',
      lead: '메커니즘을 이해한 뒤 훈련을 고르세요.',
    },
    ru: {
      title: 'Принципы',
      description: 'Внимание, награда, нагрузка, память, ритм — не медицина.',
      lead: 'Поймите механизмы — тогда выбор упражнений осмыслен.',
    },
  },
  methods: {
    zh: {
      title: '方法手段',
      description: '环境设计、数字极简、离线练习、呼吸节奏与日程锚点——可立即执行的专注重建方法。',
      lead: '方法强调可执行与可重复。先改环境与节奏，再叠加认知训练，阻力会小很多。',
    },
    en: {
      title: 'Methods',
      description: 'Environment design, digital minimalism, offline drills, breath, and daily anchors.',
      lead: 'Executable habits first—environment and rhythm, then cognitive drills.',
    },
    es: {
      title: 'Métodos',
      description: 'Entorno digital, minimalismo, ejercicios offline, respiración y anclas diarias.',
      lead: 'Hábitos ejecutables primero—entorno y ritmo, luego entrenamiento cognitivo.',
    },
    ja: {
      title: '方法',
      description: '環境・デジタル・オフライン・呼吸・日課のアンカー。',
      lead: '実行可能な習慣から。環境とリズムを先に。',
    },
    ko: {
      title: '방법',
      description: '환경, 디지털 미니멀, 오프라인, 호흡, 일과 앵커.',
      lead: '실행 가능한 습관부터—환경과 리듬, 그다음 인지 훈련.',
    },
    ru: {
      title: 'Методы',
      description: 'Среда, цифровой минимализм, офлайн, дыхание, якоря дня.',
      lead: 'Сначала среда и ритм, потом когнитивные упражнения.',
    },
  },
  plans: {
    zh: {
      title: '训练计划',
      description: '7 日重置、21 日专注重建与四周综合计划，把工具、方法与原理串成可执行路径。',
      lead: '选一个符合当前状态的计划开始。短而规律，胜过偶发猛练。',
    },
    en: {
      title: 'Plans',
      description: '7-day reset, 21-day focus rebuild, and 4-week programs.',
      lead: 'Pick a plan that fits now. Short and steady wins.',
    },
    es: {
      title: 'Planes',
      description: 'Reinicio de 7 días, foco de 21 días y programa de 4 semanas.',
      lead: 'Elige un plan que encaje ahora. Corto y constante.',
    },
    ja: {
      title: 'プラン',
      description: '7日・21日・4週間プログラム。',
      lead: '今の状態に合うプランから。短く継続。',
    },
    ko: {
      title: '플랜',
      description: '7일·21일·4주 프로그램.',
      lead: '지금에 맞는 플랜부터. 짧고 꾸준히.',
    },
    ru: {
      title: 'Планы',
      description: '7 дней, 21 день, 4 недели.',
      lead: 'Выберите план под текущее состояние. Регулярность важнее.',
    },
  },
  tools: {
    zh: {
      title: '训练工具',
      description: '舒尔特方格、反应时、N-Back、斯特鲁普与专注会话计时——在线认知训练工具合集。',
      lead: '',
      toolsDirectAnswer:
        'BrainTrainLab 提供五个免费在线认知训练工具，成绩保存在本机；适用于注意力、工作记忆、抑制控制与专注节律练习，非医疗用途。',
    },
    en: {
      title: 'Training tools',
      description: 'Schulte, reaction time, N-Back, Stroop, and focus timer—in-browser drills.',
      lead: '',
      toolsDirectAnswer:
        'Five free in-browser cognitive drills; scores stay local. For attention, working memory, inhibition, and rhythm—not medical use.',
    },
    es: {
      title: 'Herramientas',
      description: 'Schulte, tiempo de reacción, N-Back, Stroop y temporizador de foco.',
      lead: '',
      toolsDirectAnswer:
        'Cinco ejercicios gratis en el navegador; puntuaciones locales. Atención, memoria de trabajo, inhibición y ritmo—no uso médico.',
    },
    ja: {
      title: 'ツール',
      description: 'シュルテ、反応、N-Back、ストループ、集中タイマー。',
      lead: '',
      toolsDirectAnswer: '5つの無料ブラウザドリル。スコアはローカル。非医療。',
    },
    ko: {
      title: '훈련 도구',
      description: '슐테, 반응시, N-Back, 스트룹, 집중 타이머.',
      lead: '',
      toolsDirectAnswer: '5가지 무료 브라우저 드릴. 점수는 로컬 저장. 비의료.',
    },
    ru: {
      title: 'Инструменты',
      description: 'Шульте, реакция, N-Back, Струп, таймер фокуса.',
      lead: '',
      toolsDirectAnswer: 'Пять бесплатных упражнений в браузере. Результаты локально. Не медицина.',
    },
  },
};

export function collectionCopy(kind: ContentKind | 'tools', locale: Locale): CollectionCopy {
  return data[kind][locale];
}
