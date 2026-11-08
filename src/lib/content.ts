import { getCollection, type CollectionEntry } from 'astro:content';

export type ContentKind = 'principles' | 'methods' | 'plans';

export async function getSorted(kind: ContentKind) {
  const entries = await getCollection(kind);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getBySlug(kind: ContentKind, slug: string) {
  const entries = await getCollection(kind);
  return entries.find((entry) => entry.id === slug);
}

export function levelLabel(level: string) {
  if (level === 'beginner') return '入门';
  if (level === 'intermediate') return '进阶';
  return '挑战';
}

export function kindLabel(kind: ContentKind) {
  if (kind === 'principles') return '原理科普';
  if (kind === 'methods') return '方法手段';
  return '训练计划';
}

export function kindPath(kind: ContentKind) {
  return `/${kind}/`;
}

export type AnyEntry =
  | CollectionEntry<'principles'>
  | CollectionEntry<'methods'>
  | CollectionEntry<'plans'>;

export async function resolveRelated(kind: ContentKind, related: string[]) {
  if (!related.length) return [] as AnyEntry[];
  const entries = await getCollection(kind);
  return related
    .map((slug) => entries.find((entry) => entry.id === slug))
    .filter((entry): entry is AnyEntry => Boolean(entry));
}
