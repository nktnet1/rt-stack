/// <reference types="vite/client" />

import { getAppEnv } from './create';

const runtimeEnv =
  typeof process !== 'undefined' ? process.env : import.meta.env;

export const env = getAppEnv(runtimeEnv);
