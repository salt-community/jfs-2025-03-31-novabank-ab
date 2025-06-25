import { useAccounts, useGetAllTransactions } from '@/hooks'
import { TransactionList } from '@/components/generic'
import { AccountGallery } from '@/components/dashboard'
import Spinner from '@/components/generic/Spinner'
import { useTranslation } from 'react-i18next'
import { transformToTransactionEntries } from '@/lib/utils'
import NotificationBell from '@/components/notifications/NotificationBell'

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

  const transactionsData = transactions?.content ?? []
  const transactionEntries = transformToTransactionEntries(transactionsData)

  if (isAccountsLoading) return <Spinner />
  if (isTransactionsLoading) return <Spinner />

  if (isAccountsError)
    return <div className="p-8 text-red-500">{t('failedLoadingAccounts')}</div>
  if (isTransactionsError)
    return (
      <div className="p-8 text-red-500">{t('failedLoadingTransactions')}</div>
    )

  return (
    <>
      <div className="px-4 sm:px-8 py-6 space-y-12">
        <div className="flex items-center justify-between mb-8 sm:mb-15">
          <h1 className="text-3xl">{t('admin.dashboard')}</h1>
          <NotificationBell />
        </div>

        <AccountGallery bankAccounts={accounts} />
        <TransactionList transactions={transactionEntries} />
      </div>
    </>
  )
}
