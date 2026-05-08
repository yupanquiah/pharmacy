import { useForm } from '@tanstack/react-form'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState, useTransition } from 'react'
import { sileo } from 'sileo'
import { authClient } from '~/lib/auth-client'
import { Button } from '~/shared/components/ui/button'
import { Checkbox } from '~/shared/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '~/shared/components/ui/field'
import { Input } from '~/shared/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '~/shared/components/ui/input-group'
import { Label } from '~/shared/components/ui/label'
import { Spinner } from '~/shared/components/ui/spinner'
import { loginFormSchema } from '../schemas/signin'
import { ShowPassword } from './ShowPassword'
import { SocialAuth } from './SocialAuth'

export function SigninForm() {
  const [isPending, startTransition] = useTransition()
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        await authClient.signIn.email({
          email: value.email,
          password: value.password,
          fetchOptions: {
            onSuccess: () => {
              sileo.success({ title: 'Signed in successfully!' })
              void navigate({ to: '/dashboard' })
            },
            onError: ({ error }) => {
              sileo.error({
                title: 'Failed to sign in',
                description: error.message,
              })
            },
          },
        })
      })
    },
  })

  return (
    <form
      id="sign-in-form"
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Correo electrónico</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={isVisible ? 'text' : 'password'}
                    placeholder="Ingrese tu contraseña"
                  />
                  <InputGroupAddon align="inline-end">
                    <ShowPassword
                      isVisible={isVisible}
                      onClick={() => setIsVisible(!isVisible)}
                    />
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <Field orientation="horizontal">
          <Label htmlFor="remember-me">
            <Checkbox id="remember-me" name="remember-me" /> Recordarme
          </Label>
          <a
            href="#"
            className="ml-auto inline-block text-sm text-primary underline-offset-4 hover:text-sidebar-primary hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                Iniciando...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </Field>
        <FieldSeparator>O continuar con</FieldSeparator>
        <Field>
          <SocialAuth />
          <FieldDescription className="pt-2 text-center">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/signup"
              className="font-medium underline underline-offset-4"
            >
              Regístrate aquí
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
