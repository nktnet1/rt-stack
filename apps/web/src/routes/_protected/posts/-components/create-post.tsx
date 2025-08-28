import { PlusIcon } from '@radix-ui/react-icons';
import { isDefinedError } from '@repo/api/client';
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
import { Textarea } from '@repo/ui/components/textarea';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import * as v from 'valibot';
import { apiClient } from '@/clients/apiClient';
import FormFieldInfo from '@/routes/-components/common/form-field-info';
import Spinner from '@/routes/-components/common/spinner';

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
  const getAllPostsQuery = useQuery(apiClient.posts.all.queryOptions());
  const createPostMutation = useMutation(
    apiClient.posts.create.mutationOptions(),
  );

  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      title: `Post ${generateTimestamp()}`,
      content: `\
The year was 2081, and everybody was finally equal.  
They weren't only equal before God and the law.  
They were equal every which way.  
Nobody was smarter than anybody else.  
Nobody was better looking than anybody else.  
Nobody was stronger or quicker than anybody else.  
All this equality was due to the 211th, 212th, and 213th Amendments to the Constitution,  
and to the unceasing vigilance of agents of the United States Handicapper General.

- Harrison Bergeron by Kurt Vonnegut
  `,
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      await createPostMutation
        .mutateAsync(
          {
            title: value.title,
            content: value.content,
          },
          {
            onSuccess: async () => {
              setOpenDialog(false);
              await getAllPostsQuery.refetch();
              toast.success('Your post has been created!');
              formApi.reset();
            },
            onError: (error) => {
              if (isDefinedError(error)) {
                toast.error(error.message);
              } else {
                toast.error(`${error.name} | ${error.message}`);
              }
            },
          },
        )
        .catch(() => {
          /* Error already handled */
        });
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
      <DialogContent className="max-w-[90vw] xl:max-w-screen-lg data-[state=open]:slide-in-from-right-1/3 data-[state=closed]:slide-out-to-right-1/3">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Write about an interesting topic!
          </DialogDescription>
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
                      rows={8}
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
                  {isSubmitting ? <Spinner /> : `Create`}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
