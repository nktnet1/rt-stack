import * as v from 'valibot';

const apiPathSchema = v.pipe(
  v.custom<`/${string}`>(
    (input) => typeof input === 'string' && input.startsWith('/'),
    'API Path must start with "/" if provided.',
  ),
  v.transform((input) => {
    const normalized = input.split('/').filter(Boolean).join('/');
    return `/${normalized}` as `/${string}`;
  }),
  v.check(
    (input) => input !== '/',
    'API Path must contain at least one path segment.',
  ),
);

const basePathSchema = v.pipe(
  v.custom<`/${string}`>(
    (input) => typeof input === 'string' && input.startsWith('/'),
    'Base Path must start with "/" if provided.',
  ),
  v.check(
    (input) =>
      !input.includes('\\') &&
      input.split('/').every((segment) => segment !== '.' && segment !== '..'),
    'Base Path must not contain backslashes, ".", or ".." path segments.',
  ),
  v.transform((input) => {
    const normalized = input.split('/').filter(Boolean).join('/');
    return normalized ? `/${normalized}` : '/';
  }),
);

const envSchema = v.object({
  /**
   * This is the backend API server. Note that this should be passed as
   * a build-time variable (ARG) in docker.
   */
  PUBLIC_SERVER_URL: v.pipe(v.string(), v.url()),
  PUBLIC_SERVER_API_PATH: v.optional(apiPathSchema, '/api'),

  /**
   * Set this if you want to run or deploy your app at a base URL. This is
   * usually required for deploying a repository to GitHub/GitLab Pages.
   */
  PUBLIC_BASE_PATH: v.optional(basePathSchema, '/'),
});

const { output, issues } = v.safeParse(envSchema, import.meta.env);

if (issues) {
  throw new Error(v.summarize(issues));
}

export const env = output;
