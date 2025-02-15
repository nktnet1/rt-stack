import * as v from 'valibot';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import FormFieldInfo from '@/components/common/FormFieldInfo';
import { Label } from '@repo/ui/components/label';
import { Input } from '@repo/ui/components/input';
import { Button } from '@repo/ui/components/button';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';

const RegisterSchema = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      v.minLength(2, 'Name must be at least 2 characters'),
    ),
    email: v.pipe(v.string(), v.email('Please enter a valid email address')),
    password: v.pipe(
      v.string(),
      v.minLength(8, 'Password must be at least 8 characters'),
    ),
    confirmPassword: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      'The two passwords do not match.',
    ),
    ['confirmPassword'],
  ),
);

export default function RegisterCredentialsForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: RegisterSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
    onSubmitInvalid: (error) => {
      console.log(error);
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
        <form.Field
          name="name"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Name</Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FormFieldInfo field={field} />
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="email"
          children={(field) => (
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
          )}
        />
      </div>
      <div>
        <form.Field
          name="password"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Password</Label>
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
                  {isPasswordVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
                </Button>
              </div>
              <FormFieldInfo field={field} />
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="confirmPassword"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Confirm Password</Label>
              <div className="flex justify-end items-center relative w-full">
                <Input
                  id={field.name}
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
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
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                  }}
                >
                  {isConfirmPasswordVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
                </Button>
              </div>
              <FormFieldInfo field={field} />
            </>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} className="h-12 mt-3">
            {isSubmitting ? '...' : 'Register'}
          </Button>
        )}
      />
    </form>
  );
}
