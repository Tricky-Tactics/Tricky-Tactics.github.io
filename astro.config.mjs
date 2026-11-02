import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://trickytactics.com',
  publicDir: './static',
  trailingSlash: 'always',
  redirects: {
    '/learn-more': '/#gameplay',
    '/posts': '/',
    '/positions': '/',
  },
});
