import { createFileRoute } from '@tanstack/react-router'

import AdminLoanApplicationsPage from '@/components/admin/loans/AdminLoanApplicationsPage'
export const Route = createFileRoute('/admin/loans')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminLoanApplicationsPage />
}
