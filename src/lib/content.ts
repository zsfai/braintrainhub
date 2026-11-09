import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/types';
import { t } from '../i18n';

export type ContentKind = 'principles' | 'methods' | 'plans';

const LOCALIZED_PREFIXES = new Set(['en', 'es', 'ja', 'ko', 'ru']);

export function entryLocale(id: string): Locale {
  const [maybe] = id.split('/');
  if (LOCALIZED_PREFIXES.has(maybe)) return maybe as Locale;
  return 'zh';
}

export function entrySlug(id: string): string {
  const parts = id.split('/');
  if (parts.length === 2 && LOCALIZED_PREFIXES.has(parts[0])) return parts[1];
  return id;
}

export function contentEntryId(slug: string, locale: Locale): string {
  return locale === 'zh' ? slug : `${locale}/${slug}`;
}

export async function getSorted(kind: ContentKind, locale: Locale = 'zh') {
  const entries = await getCollection(kind);
  return entries.filter((e) => entryLocale(e.id) === locale).sort((a, b) => a.data.order - b.data.order);
}

export async function getBySlug(kind: ContentKind, slug: string, locale: Locale = 'zh') {
  const id = contentEntryId(slug, locale);
  const entries = await getCollection(kind);
  return entries.find((entry) => entry.id === id);
}

export function levelLabel(level: string, locale: Locale = 'zh') {
  const ui = t(locale);
  if (level === 'beginner') return ui.level.beginner;
  if (level === 'intermediate') return ui.level.intermediate;
  return ui.level.advanced;
}

export function kindLabel(kind: ContentKind, locale: Locale = 'zh') {
  const ui = t(locale);
  if (kind === 'principles') return ui.kindPrinciples;
  if (kind === 'methods') return ui.kindMethods;
  return ui.kindPlans;
}

export function kindPath(kind: ContentKind, locale: Locale = 'zh') {
  const base = `/${kind}/`;
  if (locale === 'zh') return base;
  return `/${locale}${base}`;
}

export type AnyEntry =
  | CollectionEntry<'principles'>
  | CollectionEntry<'methods'>
  | CollectionEntry<'plans'>;

export async function resolveRelated(kind: ContentKind, related: string[], locale: Locale = 'zh') {
  if (!related.length) return [] as AnyEntry[];
  const entries = await getCollection(kind);
  return related
    .map((slug) => entries.find((entry) => entry.id === contentEntryId(slug, locale)))
    .filter((entry): entry is AnyEntry => Boolean(entry));
}
