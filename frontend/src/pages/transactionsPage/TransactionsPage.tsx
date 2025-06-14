import type { Transaction } from '@/types'
import { TransactionItem } from '@/components/generic'
import { useTransactions } from '@/hooks'

export default function TransactionsPage() {
  const { data: transactions = [], isLoading, isError } = useTransactions()

  if (isLoading) return <div className="p-8">Loading transactions...</div>
  if (isError)
    return <div className="p-8 text-red-500">Failed loading transactions</div>

  return (
    <div >
      <h1 className="text-3xl mb-20">All transactions</h1>
      <div>
        {transactions.length === 0 ? (
          <div className="p-4 text-gray-500">No transactions found</div>
        ) : (
          transactions.map((tx: Transaction) => (
            <TransactionItem
              key={tx.id}
              name={tx.name}
              category={tx.category}
              amount={tx.amount}
              time={tx.time}
            />
          ))
        )}
      </div>
    </div>
  )
}
