import { authClient } from '@repo/auth/client';
import { Link } from '@tanstack/react-router';
import UserAvatar from '@/components/layout/nav/user-avatar';

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="px-2 md:px-4 flex items-center justify-between text-lg bg-nav h-12">
      <div className="flex gap-x-4">
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
