import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { postsLinkOptions } from '@/cons/posts-link-options';

export const Route = createLazyFileRoute('/_protected/posts/$postid/')({
  component: RouteComponent,
});

function RouteComponent() {
  const post = Route.useLoaderData();

  return (
    <div className="flex flex-col px-4 w-full max-w-6xl break-words">
      <div className="text-center p-5 rounded-2xl">
        <h1 className="text-2xl md:text-4xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          Created by <span className="font-medium">{post.author.name}</span>,{' '}
          {post.createdAt.toLocaleString()}
        </p>
      </div>
      <hr className="border border-gray-500 mt-3" />
      <Button
        asChild
        variant="link"
        className="w-12 border border-gray-500 mt-6"
      >
        <Link {...postsLinkOptions}>
          <ArrowLeftIcon />
        </Link>
      </Button>

      <div className="bg-elevated shadow rounded-2xl p-6 w-full min-h-96 border border-gray-500 break-words mt-6">
        <p className="leading-relaxed whitespace-break-spaces">
          {post.content ?? 'No content available.'}
        </p>
      </div>
    </div>
  );
}
