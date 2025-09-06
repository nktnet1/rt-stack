import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/server.ts'],
  format: 'esm',
  noExternal: [/.*/],
  platform: 'node',
  splitting: false,
  bundle: true,
  outDir: './dist',
  clean: true,
  env: { IS_SERVER_BUILD: 'true' },
  loader: { '.json': 'copy' },
  minify: true,
  sourcemap: true,

  // https://github.com/egoist/tsup/issues/927#issuecomment-2416440833
  banner: ({ format }) => {
    if (format === 'esm')
      return {
        js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
      };
    return {};
  },
});
