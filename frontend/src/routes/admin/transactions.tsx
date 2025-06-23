import AdminTransactions from '@/pages/admin/adminTransactions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminTransactions/>
}
