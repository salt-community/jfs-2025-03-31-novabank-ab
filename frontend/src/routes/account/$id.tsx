import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/$id"!</div>
}
