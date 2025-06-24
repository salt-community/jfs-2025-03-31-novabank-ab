import { ScheduledTransactionItem } from '../generic/transaction-items/ScheduledTransactionItem'
import type { Account } from '@/types'
import { useNavigate } from '@tanstack/react-router'
import { useAccountTransactions } from '@/hooks'
import Spinner from '../generic/Spinner'
import { useTranslation } from 'react-i18next'
import { yellowgoback } from '@/assets/icons'
import { TransactionItem } from '../generic/transaction-items/TransactionItem'
import useFetchEntries from '@/hooks/useFetchEntries'

type AccountBoardProps = {
  account: Account
}

export default function AccountBoard({ account }: AccountBoardProps) {
  const { t } = useTranslation('accounts')
  const navigate = useNavigate()

  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useAccountTransactions(account.id)

  // Safe fallback for useFetchEntries
  const { entries: allEntries, isLoading: allLoading } = useFetchEntries(
    transactions ?? [],
  )

  if (isLoading || allLoading) return <Spinner />
  if (isError) return <div>{t('errorLoadingTransactions')}</div>

  // Get only pending scheduled transactions
  const scheduledTransactions = transactions.filter(
    (t) => t.status === 'PENDING',
  )

  return (
    <div className="px-4 sm:px-8 py-6 space-y-12" data-testid="account-board">
      <a
        onClick={() => navigate({ to: '/accounts' })}
        className="flex items-center text-md text-black hover:opacity-70 underline-offset-5 hover:cursor-pointer"
      >
        {t('goBack')}
        <img src={yellowgoback} className="ml-2 w-6 h-6" />
      </a>
      <h1 className="text-4xl mb-20">{account.type}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <p className="mt-4 text-gray-600 text2xl">{t('totalBalance')}</p>
          <p className="text-4xl font-bold">
            {account.balance}&nbsp;{account.currency}
          </p>
          <button
            onClick={() => navigate({ to: '/transfer' })}
            className="mt-4 cursor-pointer px-4 py-2 bg-[#FFB20F] hover:bg-[#F5A700] rounded-md text-md shadow"
          >
            + {t('newTransfer')}
          </button>
        </div>

        <div className="border-l pl-8">
          <p className="text-md text-gray-500">{t('accountStatus')}</p>
          <p className="text-2xl ">{account.status}</p>
          <p className="mt-4 text-md text-gray-500">{t('accountNumber')}</p>
          <p className="text-2xl ">{account.accountNumber}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">{t('scheduledTransasctions')}</h2>
        <div className="space-y-2">
          {scheduledTransactions.length > 0 ? (
            scheduledTransactions.map((t) => (
              <ScheduledTransactionItem
                transactionId={t.transactionId}
                key={t.transactionId}
                amount={t.amount}
                description={t.description}
                fromAccountId={t.fromAccountId}
                ocrNumber={t.ocrNumber}
                scheduledDate={t.date}
                toAccountId={t.toAccountId}
                accountNoType={t.type}
                category={t.category}
              />
            ))
          ) : (
            <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl mb-4">{t('transactions')}</h2>
        <div className="space-y-2">
          {allEntries.length === 0 ? (
            <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
          ) : (
            allEntries.map((tx) => (
              <TransactionItem
                key={tx.key}
                description={tx.description}
                theAccount={tx.theAccount}
                accountNoType={tx.accountNoType}
                amount={tx.amount}
                time={tx.time}
                direction={tx.direction}
                category={tx.category}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
