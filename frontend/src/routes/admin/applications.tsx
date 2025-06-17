import { createFileRoute } from '@tanstack/react-router'

import AdminApplicationsPage from '@/components/admin/applications/AdminApplicationsPage'
export const Route = createFileRoute('/admin/applications')({
  component: RouteComponent,
})

function RouteComponent() {
return <AdminApplicationsPage/>
}
