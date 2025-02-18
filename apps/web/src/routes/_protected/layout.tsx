import { authClient } from '@repo/auth/client';
import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  component: Layout,
});

function Layout() {
  const { data: session } = authClient.useSession();

  if (!session?.user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
