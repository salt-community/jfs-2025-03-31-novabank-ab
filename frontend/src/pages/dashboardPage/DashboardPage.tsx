import { useAccounts, useTransactions } from '@/hooks'
import TransactionList from '@/components/dashboard/TransactionList'
import AccountGallery from '@/components/dashboard/AccountGallery'

export default function DashboardPage() {
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
      <AccountGallery bankAccounts={accounts} />
      <TransactionList transactions={transactions} />
    </>
  )
}
