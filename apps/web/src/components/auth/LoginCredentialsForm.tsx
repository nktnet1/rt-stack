import * as v from 'valibot';
import { useForm } from '@tanstack/react-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import FormFieldInfo from '@/components/common/FormFieldInfo';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email('Please enter a valid email address')),
  password: v.pipe(
    v.string(),
    v.minLength(8, 'Password must be at least 8 characters'),
  ),
});

export default function LoginCredentialsForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      className="flex flex-col gap-y-3 border p-4 w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <form.Field
          name="email"
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  type="email"
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
          name="password"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Password</Label>
              <>
                <div className="flex justify-end items-center relative w-full">
                  <Input
                    id={field.name}
                    type={isPasswordVisible ? 'text' : 'password'}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <Button
                    className="absolute mr-2 w-7 h-7 rounded-full"
                    type="button"
                    tabIndex={-1}
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPasswordVisible(!isPasswordVisible);
                    }}
                  >
                    {isPasswordVisible ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
                <FormFieldInfo field={field} />
              </>
            </>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} className="h-12 mt-3">
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      />
    </form>
  );
}
