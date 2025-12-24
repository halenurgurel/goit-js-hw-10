import { defineConfig } from 'vite';
import glob from 'glob';
import { resolve } from 'path';
import vitePluginFullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '/goit-js-hw-10/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      input: glob.sync('./*.html'),
    },
    outDir: 'dist',
  },
  plugins: [vitePluginFullReload(['./src/**/**.js', './*.html'])],
});