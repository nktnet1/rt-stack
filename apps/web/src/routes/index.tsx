import {
  ExternalLinkIcon,
  Link2Icon,
  MoonIcon,
  SunIcon,
} from '@radix-ui/react-icons';
import { Trans, useTranslation } from '@repo/i18n/react';
import { Button } from '@repo/ui/components/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import urlJoin from 'url-join';
import { authClient } from '@/clients/authClient';
import { env } from '@/env';
import LanguageSelector from '@/routes/-components/common/language-toggle';
import { postsLinkOptions } from '@/routes/_protected/posts/-validations/posts-link-options';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const { data: session } = authClient.useSession();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="mt-1">
      {session?.user && (
        <>
          <div className="flex flex-col mb-5 bg-elevated p-3">
            <span>
              <Trans
                i18nKey="home.authenticated.welcomeUserText"
                values={{
                  name: session.user.name,
                }}
                components={{
                  Bold: <span className="font-bold" />,
                }}
              />
            </span>
            <div className="mt-3 flex gap-x-1.5">
              <span>
                <Trans
                  i18nKey="home.authenticated.clickToViewPostText"
                  components={{
                    IconComponent: <Link2Icon className="ml-1" />,
                    LinkComponent: (
                      <Link
                        {...postsLinkOptions}
                        className="text-blue-500 underline brightness-125 inline-flex items-center"
                      />
                    ),
                  }}
                />
              </span>
            </div>

            <div className="mt-3">
              <p>{t('home.authenticated.openApiReferenceText')}</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <a
                    href={urlJoin(
                      env.PUBLIC_SERVER_URL,
                      env.PUBLIC_SERVER_API_PATH,
                    )}
                    target="_blank"
                    className="text-blue-500 underline inline-flex items-center gap-x-1 break-words"
                    rel="noreferrer"
                  >
                    API
                    <ExternalLinkIcon className="mt-0.5 h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href={urlJoin(
                      env.PUBLIC_SERVER_URL,
                      env.PUBLIC_SERVER_API_PATH,
                      'auth',
                      'reference',
                    )}
                    target="_blank"
                    className="text-blue-500 underline inline-flex items-center gap-x-1 break-words"
                    rel="noreferrer"
                  >
                    Auth
                    <ExternalLinkIcon className="mt-0.5 h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      <span>
        <Trans
          i18nKey="home.common.liveDemoText"
          values={{
            appName: t('app.name'),
          }}
          components={{
            LinkComponent: (
              <a
                className="text-blue-500 underline brightness-125"
                target="_blank"
                href="https://github.com/nktnet1/rt-stack"
                rel="noreferrer"
              />
            ),
          }}
        />
      </span>

      {!session?.user && (
        <div className="mt-4">
          <Trans
            i18nKey="home.unauthenticated.loginText"
            components={{
              LinkComponent: (
                <Link to="/login" className="underline font-bold" />
              ),
            }}
          />
        </div>
      )}

      <div className="mt-3 flex items-center gap-x-2">
        {t('home.common.toggleThemeText')}
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

      <div className="mt-2 flex items-center gap-x-2">
        <span>{t('home.common.selectLanguageText')}</span>
        <LanguageSelector />
      </div>
    </div>
  );
}
