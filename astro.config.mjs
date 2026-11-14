import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a user site (victorrgouvea.github.io), so no base path.
export default defineConfig({
  site: 'https://victorrgouvea.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
});
