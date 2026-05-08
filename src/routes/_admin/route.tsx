import { createFileRoute, Outlet } from '@tanstack/react-router'
import { getSessionFn } from '~/features/auth/server/session'

export const Route = createFileRoute('/_admin')({
  component: RouteComponent,
  loader: async () => {
    const session = await getSessionFn()

    return { user: session.user }
  },
})

function RouteComponent() {
  // const { user } = Route.useLoaderData()
  return <Outlet />
}
