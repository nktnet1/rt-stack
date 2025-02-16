import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { authClient } from '@repo/auth/client';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  if (!session) {
    return (
      <div className="p-2">
        <p className="mt-3">
          Please{' '}
          <Link to="/login" className="underline font-bold">
            log in
          </Link>{' '}
          to view your posts.
        </p>
      </div>
    );
  }
  return <div className="p-2">Welcome, {session.user.name}!</div>;
}
