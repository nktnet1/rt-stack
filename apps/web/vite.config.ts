import path from 'node:path';
import { getAppEnv, CLIENT_ENV_PREFIX } from '@repo/env/create';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const env = getAppEnv(process.env);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routeToken: 'layout',
    }),
    tailwindcss(),
    react(),
  ],
  envPrefix: CLIENT_ENV_PREFIX,
  server: {
    port: env.WEB_PORT,
    host: env.WEB_HOST,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
