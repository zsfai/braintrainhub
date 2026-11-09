import { zh } from './zh';
import { en } from './en';
import { ja } from './ja';
import { ko } from './ko';
import { es } from './es';
import { ru } from './ru';
import type { Locale, UiDict } from './types';

export type { Locale, UiDict, NavItem } from './types';

export const LOCALES: Locale[] = ['zh', 'en', 'es', 'ja', 'ko', 'ru'];

export const DEFAULT_LOCALE: Locale = 'zh';

export const LOCALE_LABELS: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  es: 'Español',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
};

const dicts: Record<Locale, UiDict> = { zh, en, es, ja, ko, ru };

export function t(locale: Locale = DEFAULT_LOCALE): UiDict {
  return dicts[locale] ?? zh;
}

const PREFIXED: Locale[] = ['en', 'es', 'ja', 'ko', 'ru'];

export function localePath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!PREFIXED.includes(locale)) return p;
  return `/${locale}${p === '/' ? '/' : p}`;
}

export function localeHreflang(locale: Locale): string {
  if (locale === 'zh') return 'zh-CN';
  if (locale === 'es') return 'es';
  if (locale === 'ja') return 'ja';
  if (locale === 'ko') return 'ko';
  if (locale === 'ru') return 'ru';
  return 'en';
}

export function localeOg(locale: Locale): string {
  if (locale === 'zh') return 'zh_CN';
  if (locale === 'es') return 'es_ES';
  if (locale === 'ja') return 'ja_JP';
  if (locale === 'ko') return 'ko_KR';
  if (locale === 'ru') return 'ru_RU';
  return 'en_US';
}

export function htmlLang(locale: Locale = DEFAULT_LOCALE): string {
  return localeHreflang(locale);
}

export function siteTagline(locale: Locale): string {
  return t(locale).tagline;
}
