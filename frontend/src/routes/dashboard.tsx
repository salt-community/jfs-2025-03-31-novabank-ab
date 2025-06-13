import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '@/pages/dashboardPage/DashboardPage'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
        <DashboardPage />
  )
}
