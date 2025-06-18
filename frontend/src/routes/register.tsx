import { createFileRoute } from '@tanstack/react-router'
import { RegisterApplicationForm } from '@/components/register/RegisterApplicationForm'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegisterApplicationForm />
}
