import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Transaction } from '@/types'
import { useGetAllTransactions, useAccounts } from '@/hooks'
import Spinner from '@/components/generic/Spinner'
import { AllTransactionsItem } from '@/components/generic/AllTransactionsItem'

export default function TransactionsPage() {
  const { t } = useTranslation('accounts')
  const [page, setPage] = useState(0)
  const pageSize = 10

  const {
    data,
    isLoading,
    isError,
  } = useGetAllTransactions(page, pageSize)

  const { data: accounts = [], isLoading: accountsLoading } = useAccounts()

  const myAccountIds = new Set(accounts?.map((a) => a.id))
  const theAcc = accounts?.find((a) => a.id)

  if (isLoading || accountsLoading) return <Spinner />
  if (isError || !data) {
    return (
      <div className="p-8 text-red-500">{t('failedToLoadTransactions')}</div>
    )
  }

  const seen = new Set()

  return (
    <div>
      <h1 className="text-3xl mb-20">{t('allTransactions')}</h1>

      <div className="px-5 shadow-sm">
        {data.content.length === 0 ? (
          <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
        ) : (
          data.content
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
                <AllTransactionsItem
                  key={tx.transactionId}
                  description={tx.description}
                  sender={theAcc?.type}
                  accountNoType={tx.type}
                  amount={tx.amount}
                  time={tx.date}
                  direction={direction}
                />
              )
            })
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center px-5 py-4">
        <button
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          disabled={data.first}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          {t('previous')}
        </button>

        <span className="text-sm text-gray-600">
          {t('page')} {data.number + 1} / {data.totalPages}
        </span>

        <button
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          disabled={data.last}
          onClick={() => setPage((p) => p + 1)}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}

