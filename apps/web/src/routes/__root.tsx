import { Navbar } from '@/components/layout/nav/navbar';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from '@repo/ui/components/sonner';
import type { trpcQueryUtils } from '@/router';

export interface RouterAppContext {
  trpcQueryUtils: typeof trpcQueryUtils;
}
export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <Toaster
        toastOptions={{
          classNames: {
            // !important to override: https://github.com/shadcn-ui/ui/issues/3579
            error: '!border-none !bg-toast-error !text-foreground',
            info: '!border-none !bg-toast-info !text-foreground',
            loading: '!border-none !bg-toast-loading !text-foreground',
            success: '!border-none !bg-toast-success !text-foreground',
            warning: '!border-none !bg-toast-warning !text-foreground',
          },
        }}
      />
      <div className="p-2 md:p-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
