import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: './', // Universal relative asset loading for GitHub Pages, Custom Domains, and Edge CDNs
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: false,
  },
});
