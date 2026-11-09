export const SITE_URL = 'https://braintrainlab.com';
export const SITE_NAME = 'BrainTrainLab';
export const SITE_TAGLINE = '认知训练与专注力重建';
export const OG_IMAGE = `${SITE_URL}/og.svg`;
export const SITE_FAVICON = '/think.png';
export const THEME_COLOR = '#0F766E';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

const KNOWS_ABOUT = [
  'Cognitive training',
  'Attention',
  'Working memory',
  'Executive function',
  'Focus and productivity',
  'Digital wellness',
] as const;

export function organizationSchema(description: string, inLanguage: string) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description,
    inLanguage,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${SITE_FAVICON}`,
    },
    knowsAbout: [...KNOWS_ABOUT],
  };
}

export function websiteSchema(inLanguage: string, description: string) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage,
    description,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
}) {
  const lang = opts.inLanguage ?? 'zh-CN';
  return {
    '@type': 'Article',
    '@id': `${opts.url}#article`,
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    image: [OG_IMAGE],
    inLanguage: lang,
    isAccessibleForFree: true,
    author: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${SITE_FAVICON}`,
      },
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
  };
}

export function speakableWebPage(opts: {
  url: string;
  name: string;
  description: string;
  cssSelector: string[];
  inLanguage: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': opts.url,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.inLanguage,
    isPartOf: { '@id': WEBSITE_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: opts.cssSelector,
    },
  };
}

export function webApplicationSchema(opts: {
  name: string;
  url: string;
  description: string;
  locale?: string;
}) {
  const lang = opts.locale ?? 'zh';
  const inLanguage = lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en' : lang;
  const currency = lang === 'zh' ? 'CNY' : 'USD';
  return {
    '@type': 'WebApplication',
    '@id': `${opts.url}#app`,
    name: opts.name,
    url: opts.url,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript',
    inLanguage,
    offers: { '@type': 'Offer', price: '0', priceCurrency: currency },
    description: opts.description,
    provider: { '@id': ORG_ID },
  };
}

export const DISCLAIMER_PARTS = {
  label: '科普声明',
  scope: '本站内容仅供认知训练与行为科普参考，不构成医疗、心理咨询或诊断建议。',
  help: '若你正经历持续困扰，请寻求合格专业人士的帮助。',
} as const;

/** 纯文本（供极少数需要整段字符串的场景） */
export const DISCLAIMER = `${DISCLAIMER_PARTS.scope}${DISCLAIMER_PARTS.help}`;
