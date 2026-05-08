import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '~/features/admin/dashboard'

export const Route = createFileRoute('/_admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Dashboard />
    </div>
  )
}
