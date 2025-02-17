/// <reference types="vite/client" />

import * as v from 'valibot';
import { createEnv } from '@t3-oss/env-core';

const runtimeEnv =
  typeof process !== 'undefined' ? process.env : import.meta.env;

export const env = createEnv({
  runtimeEnv,
  emptyStringAsUndefined: true,

  // Your vite apps must also define `envPrefix` to be the same.
  clientPrefix: 'PUBLIC_',
  client: {
    PUBLIC_WEB_URL: v.pipe(v.string(), v.minLength(1), v.url()),
    PUBLIC_API_URL: v.pipe(v.string(), v.minLength(1), v.url()),
  },

  shared: {
    NODE_ENV: v.optional(v.picklist(['development', 'production'])),
  },

  server: {
    API_PORT: v.pipe(
      v.optional(v.string(), '3000'),
      v.transform((s) => parseInt(s, 10)),
      v.number(),
      v.minValue(1024),
      v.maxValue(65535),
    ),
    AUTH_SECRET:
      runtimeEnv.NODE_ENV === 'production'
        ? v.pipe(v.string(), v.minLength(1))
        : v.optional(v.pipe(v.string(), v.minLength(1))),
  },

  skipValidation: !!runtimeEnv.CI || runtimeEnv.npm_lifecycle_event === 'lint',
});
