import { defineConfig } from 'astro/config';

// Served at victorgouvea.com.br (public/CNAME). Set CUSTOM_DOMAIN to false, and remove
// public/CNAME, to go back to victorrgouvea.github.io/portfolio.
const CUSTOM_DOMAIN = true;

export default defineConfig({
  site: CUSTOM_DOMAIN ? 'https://victorgouvea.com.br' : 'https://victorrgouvea.github.io',
  base: CUSTOM_DOMAIN ? '/' : '/portfolio',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
});
