import { createTRPCContext, publicProcedure, router } from './trpc';

export { createTRPCContext };

export const appRouter = router({
  echo: publicProcedure.query(async () => {
    return { message: 'helloworld' };
  }),
});

export type AppRouter = typeof appRouter;
