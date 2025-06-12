import { createFileRoute } from '@tanstack/react-router'
import AccountPage from '@/pages/accountPage/AccountPage'

export const Route = createFileRoute('/accounts/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AccountPage />
}
