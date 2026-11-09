import type { Locale } from './types';

export const PREFIXED_LOCALES: Locale[] = ['en', 'es', 'ja', 'ko', 'ru'];

/** Infer locale from URL path (e.g. 404 on `/en/missing/`). */
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.replace(/^\/+/, '').split('/')[0];
  if (PREFIXED_LOCALES.includes(seg as Locale)) return seg as Locale;
  return 'zh';
}
