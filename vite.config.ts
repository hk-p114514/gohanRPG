import { resolve } from 'path';

import { defineConfig } from 'vite';

const ROOT_DIR_PATH = resolve(__dirname, '');
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
      alias: {
        '@': resolve(__dirname, 'src'),
        // '#': resolve(__dirname, 'src/#'),
        functions: resolve(__dirname, 'src/functions'),
        scenes: resolve(__dirname, 'src/scenes'),
        classes: resolve(__dirname, 'src/classes'),
        friends: resolve(__dirname, 'src/friends'),
        skillsFunction: resolve(__dirname, 'src/skillsFunction'),
        timelineWords: resolve(__dirname, 'src/timelineWords'),
        actor: resolve(__dirname, 'src/actor'),
        index: resolve(__dirname, 'src/index'),
        playerAnims: resolve(__dirname, 'src/playerAnims'),
        src: resolve('/src'),
      },
    },

    plugins: [],
  };
});
