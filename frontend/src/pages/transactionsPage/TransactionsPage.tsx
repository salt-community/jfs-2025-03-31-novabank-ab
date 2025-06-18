import type { Transaction } from '@/types'
import { TransactionItem } from '@/components/generic'
import { useTransactions } from '@/hooks'
import Spinner from '@/components/generic/Spinner'

export default function TransactionsPage() {
  const { data: transactions = [], isLoading, isError } = useTransactions()
 

  if (isLoading) return <Spinner />
  if (isError) {
    return <div className="p-8 text-red-500">Failed to load transactions</div>
  }

  return (
    <div>
      <h1 className="text-3xl mb-20">All transactions</h1>
      <div className=" px-5  shadow-sm">
        {transactions.length === 0 ? (
          <div className="p-4 text-gray-500">No transactions found</div>
        ) : (
          transactions.map((tx: Transaction) => (
            <TransactionItem
              key={tx.transactionId}
              name={tx.description}
              category={tx.type}
              amount={tx.amount}
              time={tx.date}
            />
          ))
        )}
      </div>
    </div>
  )
}
