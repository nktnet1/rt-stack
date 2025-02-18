import Spinner from '@/components/layout/spinner';
import { authClient } from '@repo/auth/client';
import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: Layout,
});

function Layout() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Spinner />;
  }

  if (!session?.user) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
