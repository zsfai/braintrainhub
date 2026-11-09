import type { Locale } from '../i18n/types';

const BASE = 'https://schultetable.pro';

/** Locale-matched Schulte Table Pro homepage (en/ko use default site). */
export function schulteProUrl(locale: Locale): string {
  switch (locale) {
    case 'zh':
      return `${BASE}/zh/`;
    case 'ja':
      return `${BASE}/ja/`;
    case 'ru':
      return `${BASE}/ru/`;
    case 'es':
      return `${BASE}/es/`;
    case 'en':
    case 'ko':
    default:
      return `${BASE}/`;
  }
}
