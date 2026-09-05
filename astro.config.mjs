import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fstrony.github.io',
  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname !== '/',
    }),
  ],
  i18n: {
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});