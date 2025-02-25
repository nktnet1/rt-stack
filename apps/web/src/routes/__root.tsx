import { Toaster } from '@repo/ui/components/sonner';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import React from 'react';
import { authClient } from '#web/clients/authClient';
import Spinner from '#web/routes/-components/common/spinner';
import NavContainer from '#web/routes/-components/layout/nav/nav-container';
import { Navbar } from '#web/routes/-components/layout/nav/navbar';

export const Route = createRootRoute({
  component: RootComponent,
});

// https://tanstack.com/router/v1/docs/framework/react/devtools
const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

function RootComponent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <>
        <NavContainer>
          <Spinner />
        </NavContainer>
      </>
    );
  }

  return (
    <>
      <Navbar session={session} />
      <Toaster />
      <div className="p-2 md:p-4">
        <Outlet />
      </div>
      <React.Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </React.Suspense>
    </>
  );
}
