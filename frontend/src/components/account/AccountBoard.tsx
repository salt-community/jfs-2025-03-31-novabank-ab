import type { Account } from '@/types'
import { useNavigate } from '@tanstack/react-router'
import { useAccountTransactions } from '@/hooks'
import Spinner from '../generic/Spinner'
import { useTranslation } from 'react-i18next'
import { yellowgoback } from '@/assets/icons'
import useFetchEntries from '@/hooks/useFetchEntries'
import { TransactionItem } from '../generic/transaction-items/Transactiontem'
import { transformToTransactionEntries } from '@/lib/utils'
import { TransactionAccItem } from '../generic/transaction-items/TransactionAccItem'

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

  const transactionEntries = transformToTransactionEntries(
    transactions,
    account.id,
  )

  const { entries, isLoading: allLoading } = useFetchEntries(transactionEntries)

  if (isLoading || allLoading) return <Spinner />
  if (isError) return <div>{t('errorLoadingTransactions')}</div>

  const scheduledTransactions = entries.filter((t) => t.status === 'PENDING')
  const regularTransactions = entries.filter((t) => t.status !== 'PENDING')

  return (
    <div className="px-4 sm:px-8 py-6 space-y-12" data-testid="account-board">
      <a
        onClick={() => navigate({ to: '/accounts' })}
        className="flex items-center text-md text-black hover:opacity-70 underline-offset-5 hover:cursor-pointer"
      >
        {t('goBack')}
        <img src={yellowgoback} className="ml-2 w-6 h-6" />
      </a>
      <h1 className="text-3xl mb-8 sm:mb-15">{account.type}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <p className="text-md text-gray-500">{t('totalBalance')}</p>
          <p className="text-4xl font-bold">
            {account.balance}&nbsp;{account.currency}
          </p>
          <button
            onClick={() => navigate({ to: '/transfer' })}
            className="mt-4 cursor-pointer py-2 px-3 bg-[#FFB20F] hover:bg-[#F5A700] rounded-md shadow-md"
          >
            + {t('newTransfer')}
          </button>
        </div>

        <div className="border-transparent sm:border-l sm:border-gray-300 sm:pl-8">
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
              <TransactionItem
                key={t.transactionId}
                transaction={t}
                variant="scheduled"
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
          {regularTransactions.length === 0 ? (
            <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
          ) : (
            regularTransactions.map((tx) => (
              <TransactionAccItem
                key={tx.transactionId}
                transaction={tx}
                variant="regular"
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
