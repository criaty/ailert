/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import { join } from 'path';
// @ts-expect-error: untyped.
import postprocess from '@stadtlandnetz/rollup-plugin-postprocess';
import getSrcInputs from './vite.config.utils';

const LIB_NAME = 'ui';
const MINIFY = false;

export default defineConfig({
  root: __dirname,
  cacheDir: `../../node_modules/.vite/${LIB_NAME}`,

  plugins: [
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
    }),

    // Remove import for external dependencies at the index files only.
    // In the postprocess pluging, the index.ts files start with "export...",
    // followed by the imports of external libs which can be dropped.
    postprocess((param: { code: string; sourceMap: string; format: string }) =>
      param.code.startsWith('export') ? [[/import [^;]*/, '']] : [],
    ),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  esbuild: {
    minifyIdentifiers: MINIFY,
  },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: `../../dist/libs/${LIB_NAME}`,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    target: 'es2020',
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: LIB_NAME,
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es'],
    },
    rollupOptions: {
      // This will split code into different files, for tree shaking.
      input: getSrcInputs(__dirname),
      output: {
        // This will split code into different files, for tree shaking.
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
      // External packages that should not be bundled into your library.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@mui/material',
        '@mui/icons-material',
        'notistack',
        'react-use',
        '@google/generative-ai',
        '@blockium/i18n',
        '@blockium/ui',
        '@ailert/model-types',
      ],
    },
  },

  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: `../../coverage/libs/${LIB_NAME}`,
      provider: 'v8',
    },
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: '../../test-setup.ts',
  },
});
