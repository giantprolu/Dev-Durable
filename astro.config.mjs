// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://dev-durable.vercel.app',
  output: 'server',
  adapter: vercel({
    maxDuration: 60,
  }),
  integrations: [sitemap()],
  vite: {
    ssr: {
      noExternal: ['@prisma/client', '@prisma/client/runtime/client'],
    },
    optimizeDeps: {
      exclude: ['@prisma/client'],
    },
  },
});
