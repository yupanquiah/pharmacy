import { useForm } from '@tanstack/react-form'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState, useTransition } from 'react'
import { sileo } from 'sileo'
import { ShowPassword } from '~/features/auth/components/ShowPassword'
import { SocialAuth } from '~/features/auth/components/SocialAuth'
import { SignupFormSchema } from '~/features/auth/schemas/signup'
import { authClient } from '~/lib/auth-client'
import { Button } from '~/shared/components/ui/button'
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
import { Spinner } from '~/shared/components/ui/spinner'

export function SignupForm() {
  const [isPending, startTransition] = useTransition()
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validators: {
      onSubmit: SignupFormSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          fetchOptions: {
            onSuccess: () => {
              sileo.success({ title: 'Cuenta creada exitosamente' })
              void navigate({ to: '/dashboard' })
            },
            onError: ({ error }) => {
              sileo.error({
                title: 'Error al crear la cuenta',
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
      id="signup-form"
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  placeholder="Juan Pérez"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
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
        <form.Field
          name="confirm_password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Confirmar contraseña
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={isVisible ? 'text' : 'password'}
                    placeholder="Confirme su contraseña"
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
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                Creando cuenta...
              </>
            ) : (
              'Crear cuenta'
            )}
          </Button>
        </Field>
        <FieldSeparator>O continuar con</FieldSeparator>
        <Field>
          <SocialAuth />
          <FieldDescription className="pt-2 text-center">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/signin"
              className="font-medium underline underline-offset-4"
            >
              Inicia sesión
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
