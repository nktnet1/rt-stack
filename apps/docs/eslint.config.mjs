import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import { restrictEnvAccess } from '@repo/eslint-config/base';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config([
  {
    ignores: ['.git', '.next', '.source', 'node_modules'],
  },
  ...restrictEnvAccess,
  ...compat.extends('next/typescript', 'next/core-web-vitals'),
  prettierRecommended,
]);