import { ExitIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTranslation } from '@repo/i18n/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { useTheme } from 'next-themes';
import { authClient } from '@/clients/authClient';

export default function UserAvatar({
  user,
}: Readonly<{
  user: typeof authClient.$Infer.Session.user;
}>) {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer w-8.5 h-8.5">
          <AvatarImage referrerPolicy="no-referrer" src={user.image ?? ''} />
          <AvatarFallback className="text-sm">
            {(user.name?.split(' ')[0]?.[0] || '') +
              (user.name?.split(' ')[1]?.[0] || '')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <div className="flex flex-col p-2 max-w-full break-words whitespace-break-spaces">
          <span className="text-sm font-bold line-clamp-2">{user.name}</span>
          <span className="text-xs italic mt-1 line-clamp-2">{user.email}</span>
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
          <span className="ml-[5px] capitalize">{t('nav.avatar.theme')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut();
          }}
          className="cursor-pointer"
        >
          <ExitIcon className="mr-[5px] w-5 ml-[0.5px]" />
          {t('nav.avatar.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
