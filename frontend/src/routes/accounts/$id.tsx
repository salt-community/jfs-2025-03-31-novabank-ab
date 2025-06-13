import { createFileRoute, useParams } from '@tanstack/react-router'
import AccountPage from '@/pages/accountsPage/AccountPage'

export const Route = createFileRoute('/accounts/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: '/accounts/$id' })
  return <AccountPage id={id} />
}
