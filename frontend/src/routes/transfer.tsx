import { createFileRoute } from '@tanstack/react-router'
import TransferPage from '@/pages/transferPage/transferPage'
import { useAccounts } from '@/hooks'

export const Route = createFileRoute('/transfer')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: accounts = [], isLoading, isError } = useAccounts()

  if (isLoading) return <div className="p-8">Loading accounts...</div>

  if (isError)
    return <div className="p-8 text-red-500">Failed to load accounts</div>

  return <TransferPage bankAccounts={accounts} />
}
