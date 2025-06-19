import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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

  if (isLoading || accountsLoading) return <Spinner />
  if (isError || !data) {
    return (
      <div className="p-8 text-red-500">{t('failedToLoadTransactions')}</div>
    )
  }

  const transactionEntries: {
    key: string
    description: string
    accountNoType: string
    amount: number
    time: string
    direction: 'in' | 'out'
    theAccount?: string
  }[] = []

  data.content.forEach((tx) => {
    const fromIsMine = myAccountIds.has(tx.fromAccountId)
    const toIsMine = myAccountIds.has(tx.toAccountId)

    const fromAccount = accounts.find((a) => a.id === tx.fromAccountId)
    const toAccount = accounts.find((a) => a.id === tx.toAccountId)

    if (fromIsMine && toIsMine) {
      // Internal transfer, show both sides

      // Outgoing from "from" account
      transactionEntries.push({
        key: tx.transactionId + '-out',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'out',
        theAccount: fromAccount?.type,
      })

      // Incoming to "to" account
      transactionEntries.push({
        key: tx.transactionId + '-in',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'in',
        theAccount: toAccount?.type,
      })
    } else if (fromIsMine) {
      // Outgoing from user's account to external
      transactionEntries.push({
        key: tx.transactionId + '-out',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'out',
        theAccount: fromAccount?.type,
      })
    } else if (toIsMine) {
      // Incoming to user's account from external
      transactionEntries.push({
        key: tx.transactionId + '-in',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'in',
        theAccount: toAccount?.type,
      })
    }
  })

  return (
    <div>
      <h1 className="text-3xl mb-20">{t('allTransactions')}</h1>

      <div className="px-5 shadow-sm">
        {transactionEntries.length === 0 ? (
          <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
        ) : (
          transactionEntries.map((tx) => (
            <AllTransactionsItem
              key={tx.key}
              description={tx.description}
              theAccount={tx.theAccount}
              accountNoType={tx.accountNoType}
              amount={tx.amount}
              time={tx.time}
              direction={tx.direction}
            />
          ))
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
