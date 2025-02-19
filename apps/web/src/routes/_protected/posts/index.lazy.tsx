import { TrashIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import type { AppRouter } from '@repo/api/server';
import type { inferRouterOutputs } from '@trpc/server';
import CreatePostButton from '@/components/posts/create-post';
import DeletePostButton from '@/components/posts/delete-post';
import { trpc } from '@/router';

export const Route = createLazyFileRoute('/_protected/posts/')({
  component: RouteComponent,
});

function PostItem({
  post,
}: {
  post: inferRouterOutputs<AppRouter>['posts']['all'][number];
}) {
  return (
    <Link
      to="/posts/$postid"
      params={{ postid: post.id }}
      className="border border-gray-500 bg-elevated p-4 w-full flex items-center justify-between rounded-xl hover:brightness-90"
    >
      <div>
        <div className="text-lg font-bold line-clamp-1">{post.title}</div>
        <div className="italic text-sm">{post.createdAt.toLocaleString()}</div>
      </div>

      <DeletePostButton postId={post.id}>
        <TrashIcon />
      </DeletePostButton>
    </Link>
  );
}

function RouteComponent() {
  const { data: posts } = useQuery(trpc.posts.all.queryOptions());

  return (
    <div className="flex flex-col md:px-4 py-6 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Posts</h1>
        <CreatePostButton />
      </div>
      <hr className="mt-4 border-b-2 border-gray-400" />
      <div className="flex gap-x-3 gap-y-3 flex-wrap mt-6">
        {posts?.length
          ? posts.map((p) => <PostItem key={p.id} post={p} />)
          : 'There are no posts available.'}
      </div>
    </div>
  );
}
