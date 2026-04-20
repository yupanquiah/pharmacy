import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/shared/components/ui/button'

export const Route = createFileRoute('/auth/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/login/singin"!
      <Button>Iniciar session</Button>
    </div>
  )
}
