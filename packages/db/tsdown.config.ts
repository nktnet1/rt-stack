import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/scripts/push.ts',
  outDir: './dist',
  format: 'esm',
  noExternal: [/.*/],
  platform: 'node',
  unbundle: false,
  clean: true,
  minify: true,
  sourcemap: false,
  dts: { build: true },
});
