import type { Transaction } from '@/types'
import { TransactionItem } from '@/components/generic'
import { useGetAllTransactions } from '@/hooks'
import Spinner from '@/components/generic/Spinner'

export default function TransactionsPage() {
  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useGetAllTransactions()

  if (isLoading) return <Spinner />
  if (isError) {
    return <div className="p-8 text-red-500">Failed to load transactions</div>
  }
  const seen = new Set()

  return (
    <div>
      <h1 className="text-3xl mb-20">All transactions</h1>
      <div className=" px-5  shadow-sm">
        {transactions.length === 0 ? (
          <div className="p-4 text-gray-500">No transactions found</div>
        ) : (
          transactions
            .filter((tx) => {
              if (seen.has(tx.transactionId)) return false
              seen.add(tx.transactionId)
              return true
            })
            .map((tx: Transaction) => (
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
