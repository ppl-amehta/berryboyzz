import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-vercel';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({
        runtime: 'nodejs26.x',
        split: true,
        maxDuration: 60,
        memory: 1024,
      }),
    }),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@lucide/svelte')) {
            return 'lucide-icons';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
