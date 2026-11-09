import type { Locale } from './types';

/** Read active page locale from `<html lang>` set by BaseLayout. */
export function pageLocaleFromDocument(): Locale {
  const lang = document.documentElement.lang || 'zh-CN';
  if (lang.startsWith('zh')) return 'zh';
  if (lang === 'es') return 'es';
  if (lang === 'ja') return 'ja';
  if (lang === 'ko') return 'ko';
  if (lang === 'ru') return 'ru';
  return 'en';
}
