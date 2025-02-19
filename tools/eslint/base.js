/// <reference types="./types.d.ts" />

import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import onlyWarn from 'eslint-plugin-only-warn';

export const restrictEnvAccess = tseslint.config(
  { ignores: ['**/env.ts', 'dist/**'] },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message:
            "Use `import { env } from '@repo/env'` instead to ensure validated types.",
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'process',
          importNames: ['env'],
          message:
            "Use `import { env } from '@repo/envv'` instead to ensure validated types.",
        },
      ],
    },
  },
);

export default tseslint.config([
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      'no-cycle': 'warn',
    },
  },
  {
    rules: {
      semi: ['error', 'always'],
    },
  },
]);
