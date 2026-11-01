import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x',
      split: true
    }),
    alias: {
      $components: 'src/lib/components',
      $data: 'src/data',
      $types: 'src/types',
      $utils: 'src/utils',
      $services: 'src/services'
    }
  }
};

export default config;
