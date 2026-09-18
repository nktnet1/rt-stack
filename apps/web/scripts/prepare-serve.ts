import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { parseBasePath, toViteBasePath } from '../env.shared.ts';

export const prepareServe = async () => {
  const basePath = toViteBasePath(parseBasePath(process.env.PUBLIC_BASE_PATH));
  if (basePath === '/') {
    return;
  }

  const distPath = path.resolve('dist');
  const markerPath = path.join(distPath, '.serve-base-path');

  try {
    const stagedBasePath = await readFile(markerPath, 'utf8');
    if (stagedBasePath === basePath) {
      return;
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
    const mountPath = path.join(
      distPath,
      ...basePath.split('/').filter(Boolean),
    );
    await cp(tempPath, mountPath, { recursive: true, force: true });
    await writeFile(markerPath, basePath);
  } finally {
    await rm(tempPath, { recursive: true, force: true });
  }
};

const entryPath = process.argv[1];
if (
  entryPath &&
  import.meta.url === pathToFileURL(path.resolve(entryPath)).href
) {
  await prepareServe();
}
