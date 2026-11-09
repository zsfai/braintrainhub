import { localePath, type Locale } from '../i18n';
import { SITE_URL } from '../utils/site';
import { entrySlug } from './content';
import type { AnyEntry } from './content';
import type { ContentKind } from './content';

export function absUrl(path: string, locale: Locale = 'zh') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${localePath(locale, p)}`;
}

export function entryUrl(kind: ContentKind, entry: AnyEntry, locale: Locale) {
  return absUrl(`/${kind}/${entrySlug(entry.id)}/`, locale);
}
