// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lstdevfriend.github.io',
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow previewing the dev server through an ngrok tunnel. The leading
      // dot allows any subdomain (ngrok's free tier assigns a new one per session).
      allowedHosts: ['.ngrok-free.app'],
    },
  },

  integrations: [sitemap()]
});