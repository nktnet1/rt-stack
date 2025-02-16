import { routeTree } from './routeTree.gen';
import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { trpcClient } from '@repo/api/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCQueryUtils, createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@repo/api/server';
import { CircleIcon } from '@radix-ui/react-icons';

export const queryClient = new QueryClient();

export const trpc = createTRPCReact<AppRouter>({});

export const trpcQueryUtils = createTRPCQueryUtils({
  queryClient,
  client: trpcClient,
});

export function createRouter() {
  const router = createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    context: {
      trpcQueryUtils,
    },
    defaultPendingComponent: () => (
      <div className={`inline-block animate-spin duration-300 px-3`}>
        <CircleIcon />
      </div>
    ),
    Wrap: function WrapComponent({ children }) {
      return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      );
    },
  });
  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
