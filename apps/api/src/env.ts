import { createEnv } from '@t3-oss/env-core';
import * as v from 'valibot';

export const env = createEnv({
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  server: {
    BACKEND_PORT: v.number(),
    NODE_ENV: v.optional(v.picklist(['development', 'production'])),
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
