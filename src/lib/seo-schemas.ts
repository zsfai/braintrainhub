import type { Locale } from '../i18n/types';
import { localeHreflang } from '../i18n';

export type FaqItem = { question: string; answer: string };

export function schemaInLanguage(locale: Locale): string {
  return localeHreflang(locale);
}

export function faqPageSchema(url: string, items: FaqItem[], locale: Locale) {
  const inLanguage = schemaInLanguage(locale);
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    inLanguage,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function collectionPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  items: { name: string; url: string }[];
  locale: Locale;
}) {
  const inLanguage = schemaInLanguage(opts.locale);
  return {
    '@type': 'CollectionPage',
    '@id': `${opts.url}#collection`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: opts.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  locale: Locale;
  url?: string;
}) {
  const inLanguage = schemaInLanguage(opts.locale);
  return {
    '@type': 'HowTo',
    '@id': opts.url ? `${opts.url}#howto` : undefined,
    name: opts.name,
    description: opts.description,
    inLanguage,
    step: opts.steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
    })),
  };
}
