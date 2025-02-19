import { authClient } from '@repo/auth/client';
import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';
import Spinner from '@/routes/-components/layout/spinner';

export const Route = createFileRoute('/_protected')({
  component: Layout,
});

function Layout() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Spinner />;
  }

  if (!session?.user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
