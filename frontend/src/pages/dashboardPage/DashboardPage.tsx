import { useAccounts, useTransactions } from '@/hooks'
import { TransactionList } from '@/components/generic'
import { AccountGallery } from '@/components/dashboard'

export default function DashboardPage() {
  // TODO move hooks inside specific component, where it belongs

  const {
    data: accounts = [],
    isLoading: isAccountsLoading,
    isError: isAccountsError,
  } = useAccounts()

  const {
    data: transactions = [],
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useTransactions()

  if (isAccountsLoading) return <div className="p-8">Loading accounts...</div>
  if (isTransactionsLoading)
    return <div className="p-8">Loading transactions...</div>

  if (isAccountsError)
    return <div className="p-8 text-red-500">Failed to load accounts</div>
  if (isTransactionsError)
    return <div className="p-8 text-red-500">Failed to load transactions</div>

  return (
    <>
      <h1 className="text-3xl mb-10">Dashboard</h1>
      <AccountGallery bankAccounts={accounts} />
      <TransactionList transactions={transactions} />
    </>
  )
}
