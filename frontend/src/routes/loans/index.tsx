import LoansPage from '@/pages/loans/LoansPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/loans/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoansPage />
}
