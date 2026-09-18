import * as v from 'valibot';

export type AbsolutePath = `/${string}`;

const DEFAULT_BASE_PATH: AbsolutePath = '/';
const DEFAULT_WEB_URL = 'http://127.0.0.1:8085';

const normalizePath = (input: AbsolutePath): AbsolutePath => {
  const normalized = input.split('/').filter(Boolean).join('/');
  return normalized ? `/${normalized}` : '/';
};

const isSafeAbsolutePath = (input: AbsolutePath) => {
  try {
    const url = new URL(input, 'http://localhost');
    if (url.pathname !== input || url.search || url.hash) {
      return false;
    }

    return input.split('/').every((segment) => {
      const decoded = decodeURIComponent(segment);
      return (
        decoded !== '.' &&
        decoded !== '..' &&
        !decoded.includes('/') &&
        !decoded.includes('\\')
      );
    });
  } catch {
    return false;
  }
};

export const basePathSchema = v.pipe(
  v.custom<AbsolutePath>(
    (input) => typeof input === 'string' && input.startsWith('/'),
    'Base Path must start with "/" if provided.',
  ),
  v.check(
    isSafeAbsolutePath,
    'Base Path must not contain URL delimiters, encoded path separators, backslashes, or "."/".." path segments.',
  ),
  v.transform(normalizePath),
);

export const publicBasePathSchema = v.optional(
  basePathSchema,
  DEFAULT_BASE_PATH,
);

export const publicWebUrlSchema = v.pipe(
  v.optional(v.string(), DEFAULT_WEB_URL),
  v.url(),
  v.check((input) => {
    const protocol = new URL(input).protocol;
    return protocol === 'http:' || protocol === 'https:';
  }, 'Web URL must use http or https.'),
);

export const parseBasePath = (input: unknown): AbsolutePath =>
  v.parse(publicBasePathSchema, input);

export const parseWebServerAddress = (input: unknown) => {
  const webUrl = new URL(v.parse(publicWebUrlSchema, input));
  const port = webUrl.port
    ? Number.parseInt(webUrl.port, 10)
    : webUrl.protocol === 'https:'
      ? 443
      : 80;

  return {
    host: webUrl.hostname,
    port,
  };
};

export const toViteBasePath = (basePath: AbsolutePath): AbsolutePath =>
  basePath === '/' ? '/' : `${basePath}/`;
