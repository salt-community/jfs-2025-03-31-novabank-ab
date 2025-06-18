import { useTranslation } from 'react-i18next'
import type { Transaction } from '@/types'
import { TransactionItem } from '@/components/generic'
import { useGetAllTransactions, useAccounts } from '@/hooks'
import Spinner from '@/components/generic/Spinner'

export default function TransactionsPage() {
  const { t } = useTranslation('accounts')
  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useGetAllTransactions()

  const { data: accounts = [], isLoading: accountsLoading } = useAccounts()

  const myAccountIds = new Set(accounts?.map((a) => a.id))

  if (isLoading || accountsLoading) return <Spinner />
  if (isError) {
    return (
      <div className="p-8 text-red-500">{t('failedToLoadTransactions')}</div>
    )
  }
  const seen = new Set()

  return (
    <div>
      <h1 className="text-3xl mb-20">{t('allTransactions')}</h1>
      <div className="px-5 shadow-sm">
        {transactions.length === 0 ? (
          <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
        ) : (
          transactions
            .filter((tx) => {
              if (seen.has(tx.transactionId)) return false
              seen.add(tx.transactionId)
              return true
            })
            .map((tx: Transaction) => {
              let direction: 'in' | 'out' = 'out'

              if (myAccountIds.has(tx.toAccountId)) direction = 'in'
              if (myAccountIds.has(tx.fromAccountId)) direction = 'out'

              return (
                <TransactionItem
                  key={tx.transactionId}
                  name={tx.description}
                  category={tx.type}
                  amount={tx.amount}
                  time={tx.date}
                  direction={direction}
                />
              )
            })
        )}
      </div>
    </div>
  )
}
