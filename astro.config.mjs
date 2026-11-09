// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://braintrainlab.com',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        if (item.url === 'https://braintrainlab.com/') {
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
