import { Link2Icon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import { authClient } from '@/clients/authClient';
import { postsLinkOptions } from '@/routes/_protected/posts/-validations/posts-link-options';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  const { resolvedTheme, setTheme } = useTheme();

  return !session?.user ? (
    <div className="mt-1">
      <div>
        This is the live demo for{' '}
        <a
          className="text-blue-500 underline brightness-125"
          target="_blank"
          href="https://github.com/nktnet1/rt-stack"
          rel="noreferrer"
        >
          RT Stack
        </a>
        .
      </div>
      <div className="mt-4">
        Please{' '}
        <Link to="/login" className="underline font-bold">
          log in
        </Link>
        .
      </div>

      <div className="mt-3 flex items-center gap-x-2">
        Toggle theme:
        <Button
          className="w-9 h-9 rounded-full border-2 border-gray-500"
          variant="ghost"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {resolvedTheme === 'dark' ? (
            <MoonIcon className="text-yellow-300" />
          ) : (
            <SunIcon className="text-red-600" />
          )}
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col">
      <div>
        Welcome, <span className="font-bold">{session.user.name}</span>!
      </div>
      <div className="mt-3 flex gap-x-1.5">
        Click{' '}
        <Link
          {...postsLinkOptions}
          className="flex items-center gap-x-1 text-blue-500 underline"
        >
          here <Link2Icon className="mt-0.5" />
        </Link>{' '}
        to view your posts.
      </div>
      <div className="mt-3">
        For the source code, see{' '}
        <a
          className="text-blue-500 underline"
          target="_blank"
          href="https://github.com/nktnet1/rt-stack"
          rel="noreferrer"
        >
          RT Stack on GitHub
        </a>
        .
      </div>
    </div>
  );
}
