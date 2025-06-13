import { createFileRoute } from '@tanstack/react-router'
import AdminDashboard from '@/pages/admin/adminDashboard'

export const Route = createFileRoute('/admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminDashboard />
}
