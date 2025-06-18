import { createFileRoute } from '@tanstack/react-router'
import AdminUsersPage from '@/components/admin/users/AdminUsersPage'

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminUsersPage />
}
