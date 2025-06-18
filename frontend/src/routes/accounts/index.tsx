import { createFileRoute } from '@tanstack/react-router'
import AllAccountsPage from '@/pages/account/allAccountsPage'

export const Route = createFileRoute('/accounts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AllAccountsPage />
}
