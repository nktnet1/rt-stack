import UserAvatar from '@/components/layout/nav/user-avatar';
import { authClient } from '@repo/auth/client';
import { Link } from '@tanstack/react-router';

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="p-2 flex items-center justify-between text-lg bg-nav h-12">
      <div className="flex gap-x-3">
        <Link
          to="/"
          activeProps={{ className: 'brightness-70 underline' }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        {session?.user ? (
          <Link
            to="/posts"
            activeProps={{ className: 'brightness-70 underline' }}
          >
            Posts
          </Link>
        ) : null}
      </div>
      {isPending ? null : session?.user ? (
        <UserAvatar user={session.user} />
      ) : (
        <div className="flex gap-x-2 justify-between">
          <Link
            to="/login"
            activeProps={{ className: 'brightness-70 underline' }}
            activeOptions={{ exact: true }}
          >
            Login
          </Link>
          <span>|</span>
          <Link
            to="/register"
            activeProps={{ className: 'brightness-70 underline' }}
            activeOptions={{ exact: true }}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
