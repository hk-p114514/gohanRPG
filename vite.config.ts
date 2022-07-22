import { resolve } from 'path';

import { defineConfig } from 'vite';

const ROOT_DIR_PATH = resolve(__dirname, 'src');
const PUBLIC_ASSETS_DIR_PATH = resolve(__dirname, 'src/assets');
const OUTPUT_DIR_PATH = resolve(__dirname, 'dist');

export default defineConfig(() => {
  return {
    root: ROOT_DIR_PATH,
    publicDir: PUBLIC_ASSETS_DIR_PATH,
    build: {
      outDir: OUTPUT_DIR_PATH,
      emptyOutDir: true,
    },

    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },

    plugins: [],
  };
});
