import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import { env, CLIENT_ENV_PREFIX } from '@repo/env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), tailwindcss(), react()],
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
