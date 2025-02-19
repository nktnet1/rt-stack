import { trpcClient } from '@repo/api/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import type { AppRouter } from '@repo/api/server';
import Spinner from '@/components/layout/spinner';
import { routeTree } from '@/routeTree.gen';

export const queryClient = new QueryClient();

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});

export function createRouter() {
  const router = createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPendingComponent: () => <Spinner />,
    Wrap: function WrapComponent({ children }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
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
