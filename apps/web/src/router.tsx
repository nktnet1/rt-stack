import { routeTree } from './routeTree.gen';
import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createTRPCContext,
  createTRPCOptionsProxy,
} from '@trpc/tanstack-react-query';
import type { AppRouter } from '@repo/api/server';
import { CircleIcon } from '@radix-ui/react-icons';
import { trpcClient } from '@repo/api/client';

export const queryClient = new QueryClient();

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});

export function createRouter() {
  const router = createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    context: {
      trpc,
    },
    defaultPendingComponent: () => (
      <div className={`inline-block animate-spin duration-300 px-3`}>
        <CircleIcon />
      </div>
    ),
    Wrap: function WrapComponent({ children }) {
      return (
        <QueryClientProvider client={queryClient}>
          <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
            {children}
          </TRPCProvider>
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
