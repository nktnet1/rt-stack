import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { parseWebServerAddress } from '../env.shared.ts';
import { prepareServe } from './prepare-serve.ts';

await prepareServe();

const { host, port } = parseWebServerAddress(process.env.PUBLIC_WEB_URL);
const serveEntry = fileURLToPath(import.meta.resolve('serve'));
const child = spawn(
  process.execPath,
  [serveEntry, '-s', 'dist', '-l', `tcp://${host}:${port}`],
  { stdio: 'inherit' },
);

process.exitCode = await new Promise<number>((resolve, reject) => {
  child.once('error', reject);
  child.once('exit', (code) => resolve(code ?? 1));
});
