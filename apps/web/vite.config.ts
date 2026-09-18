import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import tanstackRouter from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import * as v from 'valibot';
import { defineConfig } from 'vite';

import { publicBasePathSchema, toViteBasePath } from './env.shared.ts';

/**
 * Fixes issue with "__dirname is not defined in ES module scope"
 * https://flaviocopes.com/fix-dirname-not-defined-es-module-scope
 *
 * This is only necessary when using vite with `--configLoader runner`.
 * We use this option to allow for importing TS files from monorepos.
 * https://vite.dev/config/#configuring-vite
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envSchema = v.object({
  /**
   * Vite uses this URL to configure the host and port for development and
   * preview servers. For example: http://127.0.0.1:8085.
   */
  PUBLIC_WEB_URL: v.pipe(
    v.optional(v.string(), 'http://127.0.0.1:8085'),
    v.url(),
  ),

  /**
   * Set this if you want to run or deploy your app at a base URL. This is
   * usually required for deploying a repository to GitHub/GitLab Pages.
   */
  PUBLIC_BASE_PATH: publicBasePathSchema,
});

const env = v.parse(envSchema, process.env);
const webUrl = new URL(env.PUBLIC_WEB_URL);
const host = webUrl.hostname;
const port = parseInt(webUrl.port, 10);

export default defineConfig({
  plugins: [
    tanstackRouter({
      routeToken: 'layout',
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react(),
  ],
  base: toViteBasePath(env.PUBLIC_BASE_PATH),
  envPrefix: 'PUBLIC_',
  server: {
    host,
    port,
    strictPort: true,
  },
  build: {
    rolldownOptions: {
      output: {
        /**
         * Modified from:
         * https://github.com/vitejs/vite/discussions/9440#discussioncomment-11430454
         */
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const modulePath = id.split('node_modules/')[1];
            const topLevelFolder = modulePath?.split('/')[0];
            if (topLevelFolder !== '.pnpm') {
              return topLevelFolder;
            }
            const scopedPackageName = modulePath?.split('/')[1];
            const chunkName =
              scopedPackageName?.split('@')[
                scopedPackageName.startsWith('@') ? 1 : 0
              ];
            return chunkName;
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
