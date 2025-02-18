/// <reference types="vite/client" />

import * as v from 'valibot';
import { createEnv } from '@t3-oss/env-core';

const DEFAULT_API_PORT = 3035;
const DEFAULT_WEB_PORT = 8085;

// Note: your vite apps must also define `envPrefix` to be the same.
export const CLIENT_ENV_PREFIX = 'PUBLIC_';

const runtimeEnv =
  typeof process !== 'undefined' ? process.env : import.meta.env;

const createPortSchema = ({ defaultPort }: { defaultPort: number }) =>
  v.pipe(
    v.optional(v.string(), `${defaultPort}`),
    v.transform((s) => parseInt(s, 10)),
    v.number(),
    v.minValue(0),
    v.maxValue(65535),
  );

export const env = createEnv({
  runtimeEnv,
  emptyStringAsUndefined: true,

  clientPrefix: CLIENT_ENV_PREFIX,
  client: {
    PUBLIC_API_URL: v.pipe(v.string(), v.minLength(1), v.url()),
    PUBLIC_WEB_URL: v.pipe(v.string(), v.minLength(1), v.url()),
  },

  shared: {
    NODE_ENV: v.optional(v.picklist(['development', 'production'])),
  },

  server: {
    AUTH_SECRET:
      runtimeEnv.NODE_ENV === 'production'
        ? v.pipe(v.string(), v.minLength(1))
        : v.optional(v.pipe(v.string(), v.minLength(1))),
    DATABASE_URL: v.string(),

    API_PORT: createPortSchema({ defaultPort: DEFAULT_API_PORT }),
    API_HOST: v.pipe(v.string(), v.minLength(1)),

    WEB_PORT: createPortSchema({ defaultPort: DEFAULT_WEB_PORT }),
    WEB_HOST: v.pipe(v.string(), v.minLength(1)),
  },

  skipValidation: !!runtimeEnv.CI || runtimeEnv.npm_lifecycle_event === 'lint',
});
