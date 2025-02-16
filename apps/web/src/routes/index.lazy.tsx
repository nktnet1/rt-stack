import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { authClient } from '@repo/auth/client';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  const { resolvedTheme, setTheme } = useTheme();

  if (!session?.user) {
    return (
      <div className="p-2 mt-3">
        <p>
          Please{' '}
          <Link to="/login" className="underline font-bold">
            log in
          </Link>
          .
        </p>
        <div className="mt-3 flex items-center gap-x-2">
          Toggle theme:
          <Button
            className="w-9 h-9 rounded-full border-2 border-gray-500"
            variant="ghost"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {resolvedTheme === 'dark' ? (
              <MoonIcon className="text-yellow-300" />
            ) : (
              <SunIcon className="text-red-600" />
            )}
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="p-2 mt-3 flex flex-col">
      <div>
        Welcome, <span className="font-bold">{session.user.name}</span>!
      </div>
      <div className="mt-2">
        Click <Link to="/">here</Link> to view your posts.
      </div>
    </div>
  );
}
