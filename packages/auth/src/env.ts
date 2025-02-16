import { createEnv } from '@t3-oss/env-core';
import * as v from 'valibot';

export const env = createEnv({
  runtimeEnv: process?.env ?? import.meta.env,
  emptyStringAsUndefined: true,
  clientPrefix: 'VITE_',
  client: {
    VITE_WEB_URL: v.pipe(v.string(), v.minLength(1), v.url()),
  },
  server: {
    NODE_ENV: v.optional(v.picklist(['development', 'production'])),
    API_URL: v.pipe(v.string(), v.minLength(1), v.url()),
    AUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? v.pipe(v.string(), v.minLength(1))
        : v.optional(v.pipe(v.string(), v.minLength(1))),
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
