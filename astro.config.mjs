// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://braintrainlab.com';

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en',
          es: 'es',
          ja: 'ja',
          ko: 'ko',
          ru: 'ru',
        },
      },
      filter: (page) => !page.includes('404'),
      serialize(item) {
        if (item.url === `${SITE}/`) {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (item.url.includes('/faq/')) {
          return { ...item, priority: 0.75 };
        }
        if (item.url.includes('/tools/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        if (
          item.url.includes('/principles/') ||
          item.url.includes('/methods/') ||
          item.url.includes('/plans/')
        ) {
          return { ...item, priority: 0.8 };
        }
        return item;
      },
    }),
  ],
});
