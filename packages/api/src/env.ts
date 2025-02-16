import { createEnv } from '@t3-oss/env-core';
import * as v from 'valibot';

export const env = createEnv({
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  server: {
    API_PORT: v.pipe(
      v.optional(v.string(), '3000'),
      v.transform((s) => parseInt(s, 10)),
      v.number(),
      v.minValue(1024),
      v.maxValue(65535),
    ),
    API_URL: v.pipe(v.string(), v.minLength(1), v.url()),
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
