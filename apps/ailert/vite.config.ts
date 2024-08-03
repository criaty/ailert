/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

const APP_NAME = 'ailert';
const MINIFY = true;

function transformString(inputString: string): string {
  let hash = 0;
  if (inputString.length === 0) return hash.toString();
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to a 32 bits integer
  }
  return Math.abs(hash).toString();
}

const manualChunks = (id: string) => {
  // console.log(id);

  if (id.includes('node_modules')) {
    // This is done to avoid competitors/hacks knowing the used dependencies
    const lib = id
      .toString()
      .split('node_modules/')[1]
      .split('/')[0]
      .toString();
    return transformString(lib);
    // return lib;
  }

  if (id.includes('libs')) {
    return 'app-lib';
  }

  if (id.includes('src')) {
    return 'app';
  }

  // VERY IMPORTANT: Theorically, there is nothing more to return.
  // However, without this, it will unlikely return errors like:
  // - "Uncaught TypeError: 'X' is not a function" or
  // - "Uncaught ReferenceError: Cannot access 'W' before initialization"
  return 'vendor';
};

export default defineConfig({
  root: __dirname,
  cacheDir: `../../node_modules/.vite/apps/${APP_NAME}`,

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  esbuild: {
    minifyIdentifiers: MINIFY,
  },

  build: {
    outDir: `../../dist/apps/${APP_NAME}`,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },

  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: `../../coverage/apps/${APP_NAME}`,
      provider: 'v8',
    },
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
