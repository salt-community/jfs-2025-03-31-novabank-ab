import { createFileRoute } from '@tanstack/react-router'
import { RegisterApplicationForm } from '@/components/admin/applications/RegisterApplicationForm'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegisterApplicationForm />
}
