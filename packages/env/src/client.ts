import * as v from 'valibot';
import { createEnv } from '@t3-oss/env-core';

export const env = createEnv({
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
  clientPrefix: 'VITE_PUBLIC_',
  client: {
    VITE_PUBLIC_API_URL: v.pipe(v.string(), v.minLength(1), v.url()),
    VITE_PUBLIC_WEB_URL: v.pipe(v.string(), v.minLength(1), v.url()),
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
