import { howToSchema } from './seo-schemas';
import { webApplicationSchema } from '../utils/site';
import type { Locale } from '../i18n/types';
import { localePath, t } from '../i18n';
import { SITE_URL } from '../utils/site';

export function toolSchemas(
  opts: {
    toolName: string;
    url: string;
    description: string;
    tips: string[];
  },
  locale: Locale = 'zh',
) {
  const stepLabel =
    locale === 'zh'
      ? '步骤'
      : locale === 'ja'
        ? 'ステップ'
        : locale === 'ko'
          ? '단계'
          : locale === 'ru'
            ? 'Шаг'
            : locale === 'es'
              ? 'Paso'
              : 'Step';
  const howToName =
    locale === 'zh'
      ? `如何使用${opts.toolName}`
      : locale === 'ja'
        ? `${opts.toolName}の使い方`
        : locale === 'ko'
          ? `${opts.toolName} 사용법`
          : locale === 'ru'
            ? `Как использовать ${opts.toolName}`
            : locale === 'es'
              ? `Cómo usar ${opts.toolName}`
              : `How to use ${opts.toolName}`;

  return [
    webApplicationSchema({
      name: opts.toolName,
      url: opts.url,
      description: opts.description,
      locale,
    }),
    howToSchema({
      name: howToName,
      description: opts.description,
      steps: opts.tips.map((text, index) => ({
        name: `${stepLabel} ${index + 1}`,
        text,
      })),
    }),
  ];
}

export function toolBreadcrumbs(toolTitle: string, toolPath: string, locale: Locale = 'zh') {
  const ui = t(locale);
  return [
    { name: ui.breadcrumbHome, path: localePath(locale, '/') },
    { name: ui.kindTools, path: localePath(locale, '/tools/') },
    { name: toolTitle, path: localePath(locale, toolPath) },
  ];
}

export function toolPageUrl(locale: Locale, toolPath: string) {
  return `${SITE_URL}${localePath(locale, toolPath)}`;
}
