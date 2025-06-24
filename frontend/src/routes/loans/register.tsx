import { createFileRoute } from '@tanstack/react-router'
import { RequestLoanForm } from '@/components/loan/RegisterLoanForm'

export const Route = createFileRoute('/loans/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RequestLoanForm />
}
