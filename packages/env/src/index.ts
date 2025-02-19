/// <reference types="vite/client" />

import { createValidatedEnv } from './create';

/**
 * This won't work well with config files such as
 * - drizzle.config.ts
 * - vite.config.ts
 *
 * For these cases, you should instead import the `createValidatedEnv`
 * function directly, and pass in the appropriate runtimeEnv.
 */
const runtimeEnv =
  typeof process !== 'undefined' ? process.env : import.meta.env;

export const env = createValidatedEnv(runtimeEnv);
