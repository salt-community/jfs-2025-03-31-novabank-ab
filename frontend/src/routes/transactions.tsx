import { createFileRoute } from '@tanstack/react-router'
import TransactionsPage from '@/pages/transactions/transactionsPage'

export const Route = createFileRoute('/transactions')({
  component: RouteComponent,
})

function RouteComponent() {


  
  return (
    <TransactionsPage />
  )
}
