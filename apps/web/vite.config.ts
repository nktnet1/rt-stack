import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import { env } from '@repo/env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), tailwindcss(), react()],
  envPrefix: 'PUBLIC_',
  server: {
    port: env.WEB_PORT,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
