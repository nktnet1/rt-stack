import * as v from 'valibot';
import { useForm } from '@tanstack/react-form';
import FormFieldInfo from '@/components/common/form-field-info';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { Label } from '@repo/ui/components/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { trpc } from '@/router';
import { TRPCClientError } from '@trpc/client';

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(3, 'Please enter at least 3 characters'),
  ),
  content: v.pipe(
    v.string(),
    v.minLength(5, 'Please enter at least 5 characters'),
  ),
});

const generateTimestamp = () => +new Date();

export default function CreatePostButton() {
  const getAllPostsQuery = useQuery(trpc.posts.all.queryOptions());
  const createPostMutation = useMutation(trpc.posts.create.mutationOptions());
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      title: `Post ${generateTimestamp()}`,
      content: 'Default content',
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await createPostMutation.mutateAsync({
          title: value.title,
          content: value.content,
        });
        setOpenDialog(false);
        await getAllPostsQuery.refetch();
        formApi.reset();
        toast.success('Your post has been created!');
      } catch (error) {
        if (error instanceof TRPCClientError) {
          toast.error(error.message);
        } else {
          toast.error('An unknown error has occurred. Please try again!');
        }
      }
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>Enter a title and content</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="title"
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>Title</Label>
                    <Input
                      className="mt-2"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FormFieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="content"
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>Content</Label>
                    <Textarea
                      className="mt-2"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FormFieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>
          <DialogFooter>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="mt-3 h-10 w-24"
                >
                  {isSubmitting ? '...' : `Create`}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
