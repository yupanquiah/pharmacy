import { createFileRoute } from '@tanstack/react-router'
import { SigninForm } from '~/features/auth/components/SigninForm'

export const Route = createFileRoute('/_auth/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SigninForm />
}
