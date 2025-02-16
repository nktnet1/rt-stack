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
import { ExitIcon } from '@radix-ui/react-icons';

export default function AuthDisplay() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <div className="flex gap-x-2">
        <Link to="/login">Login</Link>
        <span>|</span>
        <Link to="/register">Register</Link>
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
          <AvatarFallback>
            {(session.user.name?.split(' ')[0]?.[0] || '') +
              (session.user.name?.split(' ')[1]?.[0] || '')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex flex-col p-2">
          <span className="text-sm truncate max-w-[130px] font-bold">
            {session.user.name}
          </span>
          <span className="text-xs italic mt-1">{session.user.email}</span>
        </div>

        <hr className="mb-2" />
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut();
          }}
          className="cursor-pointer"
        >
          <ExitIcon className="mr-[5px] w-5 ml-[2px]" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
