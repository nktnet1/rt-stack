import {
  ArrowDownIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { useTranslation } from '@repo/i18n/react';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
} from '@repo/ui/components/tooltip';
import { useQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  stripSearchParams,
  type SearchSchemaInput,
} from '@tanstack/react-router';
import { Link, useNavigate } from '@tanstack/react-router';
import * as v from 'valibot';
import type { RouterOutput } from '@repo/api/client';
import { apiClient } from '@/clients/apiClient';
import { queryClient } from '@/clients/queryClient';
import CreatePostButton from '@/routes/_protected/posts/-components/create-post';
import DeletePostButton from '@/routes/_protected/posts/-components/delete-post';
import {
  postsSearchDefaults,
  postsSearchSchema,
  type PostSearchSchema,
} from '@/routes/_protected/posts/-validations/posts-link-options';

export const Route = createFileRoute('/_protected/posts/')({
  loader: () => queryClient.ensureQueryData(apiClient.posts.all.queryOptions()),
  component: RouteComponent,
  validateSearch: (input: SearchSchemaInput) =>
    v.parse(postsSearchSchema, input),
  search: {
    middlewares: [stripSearchParams(postsSearchDefaults)],
  },
  errorComponent: ({ error }) => {
    return (
      <div className="flex flex-col items-center w-full gap-y-3">
        <div>{error.message}</div>
      </div>
    );
  },
});

function PostItem({
  post,
  disabled,
}: Readonly<{
  post: RouterOutput['posts']['all'][number];
  disabled: boolean;
}>) {
  return (
    <Link
      to="/posts/$postid"
      params={{ postid: post.id }}
      className="border border-gray-500 bg-elevated p-4 w-full flex items-center justify-between gap-3 rounded-xl hover:brightness-90"
      disabled={disabled}
    >
      <div className="flex flex-col gap-y-1">
        <div className="text-lg font-bold line-clamp-3 wrap-anywhere">
          {post.title}
        </div>
        <div className="italic text-sm">
          {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>

      <DeletePostButton postId={post.id}>
        <TrashIcon />
      </DeletePostButton>
    </Link>
  );
}

function RouteComponent() {
  const { t } = useTranslation();
  const { data: posts, isPending } = useQuery(
    apiClient.posts.all.queryOptions(),
  );
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();

  const updateFilters = (name: keyof PostSearchSchema, value: unknown) => {
    navigate({ search: (prev) => ({ ...prev, [name]: value }) });
  };

  /**
   * You could memoize posts, although if you use the react 19 compiler
   * (which RT-stack will in the future), it won't be necessary.
   */
  const lowercaseSearch = search.searchString.toLowerCase();
  const filteredPost = posts
    ?.filter((p) => p.title.toLowerCase().includes(lowercaseSearch))
    ?.sort((a, b) =>
      search.sortDirection === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  return (
    <div className="flex flex-col p-1.5 md:p-4 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between border">
        <h1 className="text-2xl">{t('posts.list.title')}</h1>
        <CreatePostButton />
      </div>
      <hr className="mt-4 border-b-2 border-gray-400" />

      <div className="mt-4 flex justify-end items-center relative gap-x-2">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild onClick={(e) => e.preventDefault()}>
              <Button
                variant="link"
                className="w-12 border border-input hover:brightness-150"
                onClick={() =>
                  updateFilters(
                    'sortDirection',
                    search.sortDirection === 'asc' ? 'desc' : 'asc',
                  )
                }
              >
                {search.sortDirection === 'asc' ? (
                  <ArrowUpIcon />
                ) : (
                  <ArrowDownIcon />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="center"
              sideOffset={4}
              onPointerDownOutside={(e) => e.preventDefault()}
              className="bg-neutral-500 fill-neutral-500 duration-0"
            >
              <span>{t('posts.list.sortByCreatedDateTooltip')}</span>
              <TooltipArrow width={15} height={10} className="duration-0" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="relative sm:max-w-64 w-full">
          <Input
            value={search.searchString}
            onChange={(e) => updateFilters('searchString', e.target.value)}
            placeholder={t('posts.list.searchPlaceholder')}
            className="w-full pr-10 placeholder:italic peer"
          />
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-input peer-focus:text-foreground transition-colors" />
        </div>
      </div>

      <div className="flex gap-x-3 gap-y-3 flex-wrap my-4 md:my-6">
        {filteredPost?.length
          ? filteredPost.map((p) => (
              <PostItem key={p.id} post={p} disabled={isPending} />
            ))
          : t('posts.list.emptyText')}
      </div>
    </div>
  );
}
