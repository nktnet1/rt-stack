import path from 'node:path';
import { env, CLIENT_ENV_PREFIX } from '@repo/env';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

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
