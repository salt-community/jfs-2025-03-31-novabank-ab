import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/applications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/applications"!</div>
}
