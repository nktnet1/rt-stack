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

export default function CreatePostButton() {
  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

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
                      className="mt-1"
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
                      className="mt-1"
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
        </form>
        <DialogFooter>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="h-12 mt-3">
                {isSubmitting ? '...' : 'Create'}
              </Button>
            )}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
