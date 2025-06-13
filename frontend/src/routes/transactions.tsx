import { createFileRoute } from '@tanstack/react-router'
import TransactionsPage from '@/pages/transactionsPage/TransactionsPage'

export const Route = createFileRoute('/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TransactionsPage />
  )
}
