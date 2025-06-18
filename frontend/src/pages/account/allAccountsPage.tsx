import { AccountsBoard } from '@/components/accounts'
import Spinner from '@/components/generic/Spinner'
import { useAccounts } from '@/hooks'

export default function AllAccountsPage() {
  const { data: accounts = [], isLoading, isError } = useAccounts()

  if (isLoading) return <Spinner />

  if (isError)
    return <div className="p-8 text-red-500">Failed to load accounts</div>

  return <AccountsBoard bankAccounts={accounts} />
}
