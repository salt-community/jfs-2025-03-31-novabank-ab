import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '@/pages/dashboard/dashboardPage'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
        <DashboardPage />
  )
}
