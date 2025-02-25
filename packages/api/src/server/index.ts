import type { AuthInstance } from '@repo/auth/server';
import type { DatabaseInstance } from '@repo/db/client';
import postRouter from '#api/server/router/post';
import {
  createTRPCContext as createTRPCContextInternal,
  router,
} from '#api/server/trpc';

export const createApi = ({
  auth,
  db,
}: {
  auth: AuthInstance;
  db: DatabaseInstance;
}) => {
  return {
    trpcRouter: router({
      posts: postRouter,
    }),
    createTRPCContext: ({ headers }: { headers: Headers }) =>
      createTRPCContextInternal({ auth, db, headers }),
  };
};

export const appRouter = router({
  posts: postRouter,
});

export type AppRouter = typeof appRouter;
