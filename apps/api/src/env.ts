import { createEnv } from '@t3-oss/env-core';
import * as v from 'valibot';

export const env = createEnv({
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  server: {
    BACKEND_PORT: v.pipe(
      v.string(),
      v.transform((s) => parseInt(s, 10)),
      v.number(),
      v.minValue(1024),
      v.maxValue(65535),
    ),
    NODE_ENV: v.optional(v.picklist(['development', 'production'])),
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
