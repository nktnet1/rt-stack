import { os } from '@orpc/server';
import * as v from 'valibot';
import type { AuthInstance } from '@repo/auth/server';
import type { DatabaseInstance } from '@repo/db/client';

export const createORPCContext = async ({
  auth,
  db,
  headers,
}: {
  auth: AuthInstance;
  db: DatabaseInstance;
  headers: Headers;
}): Promise<{
  db: DatabaseInstance;
  session: AuthInstance['$Infer']['Session'] | null;
}> => {
  const session = await auth.api.getSession({
    headers,
  });
  return {
    db,
    session,
  };
};

const timingMiddleware = os.middleware(async ({ next, path }) => {
  const start = Date.now();
  let waitMsDisplay = '';
  if (process.env.NODE_ENV !== 'production') {
    // artificial delay in dev 100-500ms
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    waitMsDisplay = ` (artificial delay: ${waitMs}ms)`;
  }
  const result = await next();
  const end = Date.now();

  console.log(
    `\t[RPC] /${path.join('/')} executed after ${end - start}ms${waitMsDisplay}`,
  );
  return result;
});

const base = os.errors({
  MISSING_POST: {
    status: 404,
    data: v.object({
      postId: v.string(),
    }),
  },
  FORBIDDEN: {
    status: 403,
  },
});

export const publicProcedure = base
  .$context<Awaited<ReturnType<typeof createORPCContext>>>()
  .use(timingMiddleware);

export const protectedProcedure = publicProcedure.use(
  ({ context, next, errors }) => {
    if (!context.session?.user) {
      throw errors.FORBIDDEN({
        message: 'Invalid session',
      });
    }
    return next({
      context: {
        session: { ...context.session },
      },
    });
  },
);
