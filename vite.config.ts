import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  server: {
    port: 3000,
    open: false,
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
