import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'
import { AuthLayout } from '~/features/auth/layout/AuthLayout'

const AUTH_CONTENT = {
  '/signin': {
    title: 'Bienvenido de nuevo',
    description: 'Introduce tu correo electrónico y contraseña para iniciar',
  },
  '/signup': {
    title: 'Crea una cuenta',
    description: 'Únete ahora para disfrutar de una experiencia personalizada',
  },
} as const

const DEFAULT_CONTENT = AUTH_CONTENT['/signin']

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const matchRoute = useMatchRoute()
  const content =
    Object.entries(AUTH_CONTENT).find(([to]) => matchRoute({ to }))?.[1] ??
    DEFAULT_CONTENT

  return (
    <AuthLayout title={content.title} description={content.description}>
      <Outlet />
    </AuthLayout>
  )
}
