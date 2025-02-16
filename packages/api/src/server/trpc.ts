import { initTRPC, TRPCError } from '@trpc/server';
import { db } from '@repo/db/client';
import { auth } from '@repo/auth/server';
import { timingMiddleware } from '../middlewares/timing';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({
    headers: opts.headers,
  });
  return {
    session,
    db,
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({});

export const router = t.router;

export const publicProcedure = t.procedure.use(timingMiddleware);

export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
