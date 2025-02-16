import { authClient } from '@repo/auth/client';
import { Navigate, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { data: session } = authClient.useSession();

  if (!session?.user) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
