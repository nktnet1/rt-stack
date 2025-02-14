import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  runtimeEnv: process.env,
  clientPrefix: 'VITE_',
  server: {
    BETTER_AUTH_URL: z.string().min(1),
    AUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NODE_ENV: z.enum(['development', 'production']).optional(),
  },
  client: {},
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
