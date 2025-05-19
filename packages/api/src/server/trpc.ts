import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';
import type { AuthInstance } from '@repo/auth/server';
import type { DatabaseInstance } from '@repo/db/client';

export const createTRPCContext = async ({
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

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
});

export const router = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  let waitMsDisplay = '';
  if (t._config.isDev) {
    // artificial delay in dev 100-500ms
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    waitMsDisplay = ` (artificial delay: ${waitMs}ms)`;
  }
  const result = await next();
  const end = Date.now();

  console.log(
    `\t[TRPC] /${path} executed after ${end - start}ms${waitMsDisplay}`,
  );
  return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);

export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return next({
    ctx: {
      session: { ...ctx.session },
    },
  });
});
