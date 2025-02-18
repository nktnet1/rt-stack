import { trpc } from '@/router';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(auth)/posts/')({
  component: RouteComponent,
});

function CreatePostDialogTrigger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] data-[state=open]:slide-in-from-right-1/2 data-[state=closed]:slide-out-to-right-1/2">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>Enter a post title and content</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RouteComponent() {
  const { data: posts } = useQuery(trpc.posts.all.queryOptions());

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Posts</h1>
        <Button className="h-8">
          <PlusIcon />
          Create
        </Button>
        <CreatePostDialogTrigger />
      </div>
      <hr className="mt-3 border-b-2" />
      <div className="flex gap-x-3 gap-y-3 flex-wrap mt-3">
        {posts?.length
          ? posts.map((p) => (
              <div key={p.id} className="border bg-elevated p-4 w-full">
                <div className="text-lg font-bold line-clamp-1">{p.title}</div>
                <div className="italic text-sm">
                  {p.createdAt.toLocaleString()}
                </div>
              </div>
            ))
          : 'Please create a new post.'}
      </div>
    </div>
  );
}
