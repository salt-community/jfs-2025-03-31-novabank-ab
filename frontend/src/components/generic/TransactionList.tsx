import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import Spinner from '@/components/generic/Spinner'
import useFetchEntries, { type TransactionEntry } from '@/hooks/useFetchEntries'
import { TransactionItem } from './transaction-items/Transactiontem'

type TransactionListProps = {
  transactions: Array<TransactionEntry>
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { t } = useTranslation('accounts')
  const navigate = useNavigate()

  const { entries = [], isLoading } = useFetchEntries(transactions)

  if (isLoading) return <Spinner />

  const sortedEntries = [...entries].sort((a, b) => {
    const timeA = new Date(a?.date ?? 0).getTime()
    const timeB = new Date(b?.date ?? 0).getTime()
    return timeB - timeA
  })

  const latestThree = sortedEntries.slice(0, 3)

  return (
    <div className="mt-10" data-testid="transaction-list">
      <div className="flex flex-row justify-between items-baseline">
        <h1 className="text-2xl mb-5">{t('recentTransactions')}</h1>
        <a
          onClick={() => navigate({ to: '/transactions' })}
          className="text-md text-black hover:opacity-70 underline-offset-5 hover:cursor-pointer"
        >
          {t('seeAll')}
        </a>
      </div>

      <div className="px-5 border-1 border-gray-100 shadow-sm p-1">
        {latestThree.length === 0 ? (
          <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
        ) : (
          latestThree.map((tx) => (
            <TransactionItem key={tx.transactionId} transaction={tx} />
          ))
        )}
      </div>
    </div>
  )
}
