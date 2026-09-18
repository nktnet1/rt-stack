import * as v from 'valibot';

export type AbsolutePath = `/${string}`;

const DEFAULT_BASE_PATH: AbsolutePath = '/';

const normalizePath = (input: AbsolutePath): AbsolutePath => {
  const normalized = input.split('/').filter(Boolean).join('/');
  return normalized ? `/${normalized}` : '/';
};

const absolutePathSchema = (label: string) =>
  v.pipe(
    v.custom<AbsolutePath>(
      (input) => typeof input === 'string' && input.startsWith('/'),
      `${label} must start with "/" if provided.`,
    ),
    v.transform(normalizePath),
  );

export const apiPathSchema = v.pipe(
  absolutePathSchema('API Path'),
  v.check(
    (input) => input !== '/',
    'API Path must contain at least one path segment.',
  ),
);

export const basePathSchema = v.pipe(
  v.custom<AbsolutePath>(
    (input) => typeof input === 'string' && input.startsWith('/'),
    'Base Path must start with "/" if provided.',
  ),
  v.check(
    (input) =>
      !input.includes('\\') &&
      input.split('/').every((segment) => segment !== '.' && segment !== '..'),
    'Base Path must not contain backslashes, ".", or ".." path segments.',
  ),
  v.transform(normalizePath),
);

export const publicBasePathSchema = v.optional(
  basePathSchema,
  DEFAULT_BASE_PATH,
);

export const parseBasePath = (input: unknown): AbsolutePath =>
  v.parse(publicBasePathSchema, input);

export const toViteBasePath = (basePath: AbsolutePath): AbsolutePath =>
  basePath === '/' ? '/' : `${basePath}/`;
