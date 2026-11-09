export const SITE_URL = 'https://braintrainlab.com';
export const SITE_NAME = 'BrainTrainLab';
export const SITE_TAGLINE = '认知训练与专注力重建';
export const OG_IMAGE = `${SITE_URL}/og.svg`;
export const THEME_COLOR = '#0F766E';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function organizationSchema(description: string) {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description,
    logo: `${SITE_URL}/favicon.svg`,
  };
}

export function websiteSchema(inLanguage = 'zh-CN', description = SITE_TAGLINE) {
  return {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage,
    description,
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
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
  return {
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    inLanguage: opts.inLanguage ?? 'zh-CN',
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
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
}) {
  return {
    '@type': 'WebPage',
    url: opts.url,
    name: opts.name,
    description: opts.description,
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
  const currency = lang === 'zh' ? 'CNY' : 'USD';
  return {
    '@type': 'WebApplication',
    name: opts.name,
    url: opts.url,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    inLanguage: lang === 'zh' ? 'zh-CN' : lang,
    offers: { '@type': 'Offer', price: '0', priceCurrency: currency },
    description: opts.description,
  };
}

export const DISCLAIMER_PARTS = {
  label: '科普声明',
  scope: '本站内容仅供认知训练与行为科普参考，不构成医疗、心理咨询或诊断建议。',
  help: '若你正经历持续困扰，请寻求合格专业人士的帮助。',
} as const;

/** 纯文本（供极少数需要整段字符串的场景） */
export const DISCLAIMER = `${DISCLAIMER_PARTS.scope}${DISCLAIMER_PARTS.help}`;
