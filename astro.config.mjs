import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fstrony.github.io',
  i18n: {
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});