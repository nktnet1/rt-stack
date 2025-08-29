import * as v from 'valibot';

export const CLIENT_ENV_PREFIX = 'PUBLIC_';

export const envSchema = v.object({
  /**
   * This is the backend API server. Note that this should be passed as
   * a build-time variable (ARG) in docker.
   */
  PUBLIC_SERVER_URL: v.pipe(v.string(), v.url()),
  PUBLIC_SERVER_API_PATH: v.optional(
    v.custom<`/${string}`>(
      (input) => typeof input === 'string' && input.startsWith('/'),
    ),
    '/api',
  ),

  /**
   * Set this if you want to run or deploy your app at a base URL. This is
   * usually required for deploying a repository to Github/Gitlab pages.
   */
  PUBLIC_BASE_PATH: v.pipe(v.optional(v.string(), '/'), v.startsWith('/')),
});

export const env = v.parse(envSchema, import.meta.env);
