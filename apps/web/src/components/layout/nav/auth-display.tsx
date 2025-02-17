import { authClient } from '@repo/auth/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Link } from '@tanstack/react-router';
import { ExitIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export default function AuthDisplay() {
  const { data: session, isPending } = authClient.useSession();
  const { resolvedTheme, setTheme } = useTheme();

  if (isPending) {
    return null;
  }

  if (!session?.user) {
    return (
      <div className="flex gap-x-2 justify-between">
        <Link
          to="/login"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Login
        </Link>
        <span>|</span>
        <Link
          to="/register"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer w-8.5 h-8.5">
          <AvatarImage
            referrerPolicy="no-referrer"
            src={session.user.image ?? ''}
          />
          <AvatarFallback className="text-sm">
            {(session.user.name?.split(' ')[0]?.[0] || '') +
              (session.user.name?.split(' ')[1]?.[0] || '')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <div className="flex flex-col p-2 max-w-full break-words whitespace-break-spaces">
          <span className="text-sm truncate max-w-[130px] font-bold line-clamp-2">
            {session.user.name}
          </span>
          <span className="text-xs italic mt-1 line-clamp-2">
            {session.user.email}
          </span>
        </div>

        <hr className="mb-2" />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          }}
        >
          {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
          <span className="ml-[5px] capitalize">Theme</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut();
          }}
          className="cursor-pointer"
        >
          <ExitIcon className="mr-[5px] w-5 ml-[0.5px]" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
