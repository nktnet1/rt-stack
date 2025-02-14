import { createEnv } from '@t3-oss/env-core';
import * as v from 'valibot';

export const env = createEnv({
  runtimeEnv: process.env,
  clientPrefix: 'VITE_',
  server: {
    BETTER_AUTH_URL: v.string(),
    AUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? v.pipe(v.string(), v.minLength(1))
        : v.optional(v.pipe(v.string(), v.minLength(1))),
    NODE_ENV: v.optional(v.picklist(['development', 'production'])),
  },
  client: {},
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
