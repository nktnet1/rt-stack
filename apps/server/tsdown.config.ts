import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/server.ts',
  outDir: './dist',
  format: 'esm',
  noExternal: [/.*/],
  platform: 'node',
  unbundle: false,
  clean: true,
  minify: true,
  sourcemap: false,
  inlineOnly: false,
  outputOptions: {
    codeSplitting: false,
  },
});
