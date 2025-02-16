import { publicProcedure, router } from './trpc';

export const appRouter = router({
  echo: publicProcedure.query(async () => {
    return { message: 'helloworld' };
  }),
});

export type AppRouter = typeof appRouter;
