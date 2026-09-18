import * as v from 'valibot';

export type ApiPath = `/${string}`;

const normalizeApiPath = (input: ApiPath): ApiPath => {
  const normalized = input.split('/').filter(Boolean).join('/');
  return normalized ? `/${normalized}` : '/';
};

const isSafeApiPath = (input: ApiPath) => {
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

export const apiPathSchema = v.pipe(
  v.custom<ApiPath>(
    (input) => typeof input === 'string' && input.startsWith('/'),
    'API Path must start with "/" if provided.',
  ),
  v.check(
    isSafeApiPath,
    'API Path must not contain URL delimiters, encoded path separators, backslashes, or "."/".." path segments.',
  ),
  v.transform(normalizeApiPath),
  v.check(
    (input) => input !== '/',
    'API Path must contain at least one path segment.',
  ),
);
