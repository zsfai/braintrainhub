import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const level = z.enum(['beginner', 'intermediate', 'advanced']);

const shared = {
  title: z.string(),
  description: z.string(),
  h1: z.string(),
  directAnswer: z.string(),
  order: z.number(),
  category: z.string(),
  level,
  related: z.array(z.string()).default([]),
  updated: z.string().optional(),
  relatedTools: z.array(z.string()).default([]),
};

const principles = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/principles',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object(shared),
});

const methods = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/methods',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object(shared),
});

const plans = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/plans',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    ...shared,
    durationDays: z.number().optional(),
  }),
});

export const collections = { principles, methods, plans };
