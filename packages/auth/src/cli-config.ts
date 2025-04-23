import { createDb } from '@repo/db/client';
import { betterAuth } from 'better-auth';
import { getBaseOptions } from './server';

/**
 * @internal
 *
 * This export is needed strictly for the CLI to work with
 *     pnpm auth:schema:generate
 *
 * It should not be imported or used for any other purpose.
 *
 * The documentation for better-auth CLI can be found here:
 * - https://www.better-auth.com/docs/concepts/cli
 */
export const auth = betterAuth({
  ...getBaseOptions(createDb()),
});
