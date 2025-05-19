import { useTranslation } from '@repo/i18n/react';
import { Link } from '@tanstack/react-router';
import type { AuthSession } from '@/clients/authClient';
import LanguageSelector from '@/routes/-components/common/language-toggle';
import NavContainer from '@/routes/-components/layout/nav/nav-container';
import UserAvatar from '@/routes/-components/layout/nav/user-avatar';
import { postsLinkOptions } from '@/routes/_protected/posts/-validations/posts-link-options';

const activeClassName = 'underline decoration-2 opacity-70';

export function Navbar({ session }: Readonly<{ session: AuthSession }>) {
  const { t } = useTranslation();
  return (
    <NavContainer>
      <div className="flex gap-x-4">
        <Link
          to="/"
          activeProps={{ className: activeClassName }}
          activeOptions={{ exact: true }}
        >
          {t('nav.links.home')}
        </Link>
        {session?.user ? (
          <Link
            {...postsLinkOptions}
            activeProps={{ className: activeClassName }}
          >
            {t('nav.links.posts')}
          </Link>
        ) : null}
      </div>
      {session?.user ? (
        <div className="flex gap-x-2">
          <LanguageSelector />
          <UserAvatar user={session.user} />
        </div>
      ) : (
        <div className="flex gap-x-2 justify-between">
          <Link
            to="/login"
            activeProps={{ className: activeClassName }}
            activeOptions={{ exact: true }}
          >
            {t('nav.links.login')}
          </Link>
          <span>|</span>
          <Link
            to="/register"
            activeProps={{ className: activeClassName }}
            activeOptions={{ exact: true }}
          >
            {t('nav.links.register')}
          </Link>
        </div>
      )}
    </NavContainer>
  );
}
