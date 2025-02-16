import { Navbar } from '@/components/layout/navbar';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from '@repo/ui/components/sonner';

export const Route = createRootRoute({
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
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
