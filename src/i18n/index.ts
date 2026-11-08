import { zh } from './zh';
import type { Locale, UiDict } from './types';

export type { Locale, UiDict, NavItem } from './types';

export const LOCALES: Locale[] = ['zh'];
export const DEFAULT_LOCALE: Locale = 'zh';

const dicts: Record<Locale, UiDict> = { zh };

export function t(locale: Locale = DEFAULT_LOCALE): UiDict {
  return dicts[locale] ?? zh;
}

export function htmlLang(_locale: Locale = DEFAULT_LOCALE): string {
  return 'zh-CN';
}

export function localePath(_locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p;
}
