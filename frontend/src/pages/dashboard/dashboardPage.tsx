import { useAccounts, useGetAllTransactions } from '@/hooks'
import { TransactionList } from '@/components/generic'
import { AccountGallery } from '@/components/dashboard'
import Spinner from '@/components/generic/Spinner'
import { useTranslation } from 'react-i18next'

export default function DashboardPage() {
  const { t } = useTranslation('sidebar')
  const {
    data: accounts = [],
    isLoading: isAccountsLoading,
    isError: isAccountsError,
  } = useAccounts()

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useGetAllTransactions()

  if (isAccountsLoading) return <Spinner />
  if (isTransactionsLoading) return <Spinner />

  if (isAccountsError)
    return <div className="p-8 text-red-500">Failed to load accounts</div>
  if (isTransactionsError)
    return <div className="p-8 text-red-500">Failed to load transactions</div>

  return (
    <>
      <h1 className="text-3xl mb-20">{t('admin.dashboard')}</h1>
      <AccountGallery bankAccounts={accounts} />
      <TransactionList transactions={transactions?.content ?? []} />
    </>
  )
}
