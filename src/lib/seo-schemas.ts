import { SITE_URL } from '../utils/site';

export type FaqItem = { question: string; answer: string };

export function faqPageSchema(url: string, items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    url,
    inLanguage: 'zh-CN',
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
}) {
  return {
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: 'zh-CN',
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
}) {
  return {
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    inLanguage: 'zh-CN',
    step: opts.steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
    })),
  };
}

export function absUrl(path: string) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
