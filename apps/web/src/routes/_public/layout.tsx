import { authClient } from '@repo/auth/client';
import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: Layout,
});

function Layout() {
  const { data: session } = authClient.useSession();

  if (!session?.user) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
