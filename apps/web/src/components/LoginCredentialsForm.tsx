'use client';

import { useForm, type FieldApi } from '@tanstack/react-form';
import { Input } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import { Label } from '@repo/ui/label';
import * as v from 'valibot';

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

export default function LoginCredentialsForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      className="flex flex-col gap-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        {/* A type-safe field component*/}
        <form.Field
          name="email"
          validators={{
            onChange: v.pipe(
              v.string(),
              v.minLength(3, 'You must have a length of at least 3'),
            ),
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: v.pipeAsync(
              v.string(),
              v.checkAsync(async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes('error');
              }, "No 'error' allowed in first name"),
            ),
          }}
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Username</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>
      <div>
        <form.Field
          name="password"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Password</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      />
    </form>
  );
}
