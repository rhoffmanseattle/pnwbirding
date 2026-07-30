import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pnwbirding.longwalkhome.net',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
