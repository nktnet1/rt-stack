import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.ts',
  format: 'esm',
  noExternal: [/.*/],
  platform: 'node',
  unbundle: false,
  outDir: './dist',
  clean: true,
  minify: true,
  sourcemap: false,
  outputOptions: {
    inlineDynamicImports: true,
  },
});
