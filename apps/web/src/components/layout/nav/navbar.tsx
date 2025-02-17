import UserAvatar from '@/components/layout/nav/user-avatar';
import { authClient } from '@repo/auth/client';
import { Link } from '@tanstack/react-router';

export default function AuthDisplay() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (!session?.user) {
    return (
      <div className="flex gap-x-2 justify-between">
        <Link
          to="/login"
          activeProps={{
            className: 'brightness-70',
          }}
          activeOptions={{ exact: true }}
        >
          Login
        </Link>
        <span>|</span>
        <Link
          to="/register"
          activeProps={{
            className: 'brightness-70',
          }}
          activeOptions={{ exact: true }}
        >
          Register
        </Link>
      </div>
    );
  }

  return <UserAvatar user={session.user} />;
}

export function Navbar() {
  return (
    <div className="p-2 flex items-center justify-between text-lg bg-nav h-12">
      <div>
        <Link
          to="/"
          activeProps={{
            className: 'brightness-70',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
      </div>
      <AuthDisplay />
    </div>
  );
}
