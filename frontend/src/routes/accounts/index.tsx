import { createFileRoute } from '@tanstack/react-router'
import AccountsPage from '@/pages/accountsPage/AccountsPage'

export const Route = createFileRoute('/accounts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AccountsPage />
}
