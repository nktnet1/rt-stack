/// <reference types="vite/client" />

import { createValidatedEnv } from './create';

const runtimeEnv =
  typeof process !== 'undefined' ? process.env : import.meta.env;

export const env = createValidatedEnv(runtimeEnv);
