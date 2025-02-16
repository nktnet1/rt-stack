import * as v from 'valibot';
import { createEnv } from '@t3-oss/env-core';

export const env = createEnv({
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  server: {
    NODE_ENV: v.optional(v.picklist(['development', 'production'])),
    VITE_PUBLIC_WEB_URL: v.pipe(v.string(), v.minLength(1), v.url()),

    API_URL: v.pipe(v.string(), v.minLength(1), v.url()),
    API_PORT: v.pipe(
      v.optional(v.string(), '3000'),
      v.transform((s) => parseInt(s, 10)),
      v.number(),
      v.minValue(1024),
      v.maxValue(65535),
    ),

    AUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? v.pipe(v.string(), v.minLength(1))
        : v.optional(v.pipe(v.string(), v.minLength(1))),
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
