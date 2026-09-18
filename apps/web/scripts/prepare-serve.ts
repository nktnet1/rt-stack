import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const normalizeBasePath = (input: string): string => {
  if (!input.startsWith('/')) {
    throw new Error('PUBLIC_BASE_PATH must start with "/".');
  }

  const segments = input.split('/').filter(Boolean);
  if (
    input.includes('\\') ||
    segments.some((segment) => segment === '.' || segment === '..')
  ) {
    throw new Error(
      'PUBLIC_BASE_PATH must not contain backslashes, ".", or ".." path segments.',
    );
  }

  return segments.length === 0 ? '/' : `/${segments.join('/')}/`;
};

const basePath = normalizeBasePath(process.env.PUBLIC_BASE_PATH ?? '/');
if (basePath === '/') {
  process.exit(0);
}

const distPath = path.resolve('dist');
const markerPath = path.join(distPath, '.serve-base-path');

try {
  const stagedBasePath = await readFile(markerPath, 'utf8');
  if (stagedBasePath === basePath) {
    process.exit(0);
  }
  throw new Error(
    `dist is already prepared for PUBLIC_BASE_PATH=${stagedBasePath}. Rebuild before changing the base path.`,
  );
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
    throw error;
  }
}

const tempPath = await mkdtemp(path.join(tmpdir(), 'rt-stack-web-'));
try {
  await cp(distPath, tempPath, { recursive: true });
  const mountPath = path.join(distPath, ...basePath.split('/').filter(Boolean));
  await cp(tempPath, mountPath, { recursive: true, force: true });
  await writeFile(markerPath, basePath);
} finally {
  await rm(tempPath, { recursive: true, force: true });
}
