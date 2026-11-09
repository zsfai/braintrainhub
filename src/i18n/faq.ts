import type { FaqItem } from '../lib/seo-schemas';
import type { Locale } from './types';

const zh: FaqItem[] = [
  {
    question: 'BrainTrainLab 是医疗或心理治疗网站吗？',
    answer:
      '不是。本站提供认知训练工具、行为与认知科学科普及可执行习惯计划，不构成医疗、心理咨询或诊断建议。若有持续困扰，请寻求合格专业人士帮助。',
  },
  {
    question: '刷短视频后注意力变差，可以先做什么？',
    answer:
      '优先做两件事：收束数字环境（减少随手可点的短视频入口），以及用短时间可完成的训练建立节律，例如专注计时或舒尔特方格轻量练习，再配合原理科普理解机制。',
  },
  {
    question: '网站上的训练成绩保存在哪里？',
    answer:
      '各工具的最近成绩与会话摘要保存在你的浏览器 localStorage 中，不上传服务器。换设备或清空站点数据会丢失记录。',
  },
  {
    question: '舒尔特方格为什么要链到 schultetable.pro？',
    answer:
      '本站提供轻量舒尔特练习；毫秒级计时、多模式与打印等专业功能由 Schulte Table Pro 提供。链接名称为「舒尔特方格」，便于识别而非仅显示域名。',
  },
  {
    question: '训练计划应如何入门？',
    answer:
      '若感觉失控明显，可从「7 日重置」停损；想系统推进可选「21 日专注重建」或「四周综合」。短而规律优于偶发猛练，且不要用加练惩罚自己。',
  },
];

const en: FaqItem[] = [
  {
    question: 'Is BrainTrainLab a medical or therapy site?',
    answer:
      'No. We offer cognitive drills, behavioral science explainers, and habit plans—not diagnosis, treatment, or clinical advice. Seek qualified help if you are struggling.',
  },
  {
    question: 'Attention feels worse after short videos—what first?',
    answer:
      'Tighten your digital environment (fewer one-tap feeds) and add short, finishable sessions—focus timer or light Schulte—plus our principle articles to understand why.',
  },
  {
    question: 'Where are scores saved?',
    answer:
      'In your browser localStorage only; nothing is uploaded. New device or cleared data means lost records.',
  },
  {
    question: 'Why link Schulte to schultetable.pro?',
    answer:
      'This site is a light Schulte demo; millisecond timing, modes, and print kits live on Schulte Table Pro. The link is labeled clearly, not just a bare domain.',
  },
  {
    question: 'How should I start a plan?',
    answer:
      'If things feel out of control, try the 7-day reset; for structure, 21-day focus or 4-week blend. Short and regular beats occasional intensity—no punishing extra sets.',
  },
];

const ja: FaqItem[] = [
  {
    question: 'BrainTrainLab は医療・心理サイトですか？',
    answer:
      'いいえ。認知ドリル、科学解説、習慣プランのみで、診断・治療・臨床アドバイスではありません。',
  },
  {
    question: 'ショート動画の後、何から始めれば？',
    answer:
      'デジタル環境を整え、短いセッション（タイマー、軽いシュルテ）と原理解説から。',
  },
  {
    question: 'スコアの保存先は？',
    answer: 'ブラウザの localStorage のみ。サーバーには送信しません。',
  },
  {
    question: 'なぜ schultetable.pro へリンク？',
    answer: '軽量版は当サイト。高精度・多モードは Schulte Table Pro へ。',
  },
  {
    question: 'プランの始め方は？',
    answer: '7日リセットから。21日・4週間プランは継続を優先。',
  },
];

const ko: FaqItem[] = [
  {
    question: 'BrainTrainLab는 의료·치료 사이트인가요?',
    answer: '아니요. 인지 드릴·교육·습관 플랜이며 진단·치료 조언이 아닙니다.',
  },
  {
    question: '숏폼 후 집중력이 떨어지면?',
    answer: '디지털 환경 정리와 짧은 세션(타이머·슐테), 원리 글을 함께하세요.',
  },
  {
    question: '점수는 어디에 저장되나요?',
    answer: '브라우저 localStorage에만 저장됩니다.',
  },
  {
    question: '왜 schultetable.pro 링크?',
    answer: '가벼운 슐테는 여기, 전문 기능은 Schulte Table Pro.',
  },
  {
    question: '플랜 시작법?',
    answer: '7일 리셋부터. 짧고 규칙적으로.',
  },
];

const es: FaqItem[] = [
  {
    question: '¿BrainTrainLab es un sitio médico o de terapia?',
    answer:
      'No. Ofrecemos ejercicios cognitivos, divulgación y planes de hábitos—no diagnóstico ni tratamiento clínico.',
  },
  {
    question: 'Tras los vídeos cortos, la atención empeora—¿por dónde empezar?',
    answer:
      'Ordena tu entorno digital y añade sesiones cortas (temporizador, Schulte ligero) junto con los artículos de principios.',
  },
  {
    question: '¿Dónde se guardan las puntuaciones?',
    answer: 'Solo en el localStorage del navegador; no se suben al servidor.',
  },
  {
    question: '¿Por qué enlazar Schulte a schultetable.pro?',
    answer:
      'Aquí hay una versión ligera; tiempo al milisegundo, modos e impresión están en Schulte Table Pro.',
  },
  {
    question: '¿Cómo empezar un plan?',
    answer:
      'Reinicio de 7 días si sientes descontrol; 21 días o 4 semanas para más estructura. Corto y regular.',
  },
];

const ru: FaqItem[] = [
  {
    question: 'Это медицинский сайт?',
    answer: 'Нет. Только тренировки, обзоры и планы привычек—не лечение и не диагностика.',
  },
  {
    question: 'Внимание хуже после ленты—с чего начать?',
    answer: 'Упростите среду и добавьте короткие сессии (таймер, Шульте) плюс статьи о принципах.',
  },
  {
    question: 'Где хранятся результаты?',
    answer: 'Только в localStorage браузера.',
  },
  {
    question: 'Зачем ссылка на schultetable.pro?',
    answer: 'Здесь лёгкая версия; полный функционал — на Schulte Table Pro.',
  },
  {
    question: 'С чего начать план?',
    answer: 'С 7-дневного сброса; дальше 21 день или 4 недели—главное регулярность.',
  },
];

const map: Record<Locale, FaqItem[]> = { zh, en, es, ja, ko, ru };

export function getFaqs(locale: Locale): FaqItem[] {
  return map[locale] ?? zh;
}
