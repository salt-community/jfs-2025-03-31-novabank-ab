import { useAccounts } from '@/hooks'
import { AccountsBoard } from '@/components/accounts'

export default function AccountsPage() {
  const { data: accounts = [], isLoading, isError } = useAccounts()

  if (isLoading) return <div className="p-8">Loading accounts...</div>

  if (isError)
    return <div className="p-8 text-red-500">Failed to load accounts</div>

  return <AccountsBoard bankAccounts={accounts} />
}
