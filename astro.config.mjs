import { defineConfig } from 'astro/config';

// GitHub Pages project site: served under /portfolio until the custom domain is live.
// When victorgouvea.com.br points here, set CUSTOM_DOMAIN to true and add public/CNAME.
const CUSTOM_DOMAIN = false;

export default defineConfig({
  site: CUSTOM_DOMAIN ? 'https://victorgouvea.com.br' : 'https://victorrgouvea.github.io',
  base: CUSTOM_DOMAIN ? '/' : '/portfolio',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
});
