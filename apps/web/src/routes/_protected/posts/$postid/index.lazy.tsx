import { ArrowLeftIcon, LineHeightIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import { createLazyFileRoute, Link } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/posts/$postid/')({
  component: RouteComponent,
});

function RouteComponent() {
  const post = Route.useLoaderData();

  return (
    <div className="flex flex-col px-4 py-6 w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-4">
          Written by <span className="font-medium">{post.author.name}</span>,{' '}
          {post.createdAt.toLocaleString()}
          {post.updatedAt && post.lastUpdateUser && (
            <>
              • Last updated by{' '}
              <span className="font-medium">{post.lastUpdateUser.name}</span>,{' '}
              {post.updatedAt.toLocaleDateString()}
            </>
          )}
        </p>
      </div>
      <Button asChild variant="link" className="w-12 border border-gray-500">
        <Link to="/posts">
          <ArrowLeftIcon />
        </Link>
      </Button>

      <div className="bg-elevated shadow rounded-2xl p-6 w-full min-h-96">
        <p className="leading-relaxed">
          {post.content ?? 'No content available.'}
        </p>
      </div>
    </div>
  );
}
