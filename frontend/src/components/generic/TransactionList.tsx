import { useNavigate } from '@tanstack/react-router'
import { TransactionItem } from '../generic'
import type { Transaction } from '@/types'

type TransactionListProps = {
  transactions: Array<Transaction>
}

export function TransactionList({ transactions }: TransactionListProps) {
  const navigate = useNavigate()
  const seen = new Set()
  return (
    <div className="mt-10" data-testid="transaction-list">
      <div className="flex flex-row justify-between items-baseline">
        <h1 className="text-2xl mb-5">Recent transactions</h1>
        <a
          onClick={() => navigate({ to: '/transactions' })}
          className="text-md text-black hover:opacity-70 underline-offset-5 hover:cursor-pointer"
        >
          See all
        </a>
      </div>

      <div className="px-5 border-1 border-gray-100 shadow-sm p-1">
        {transactions.length === 0 ? (
          <div className="p-4 text-gray-500">No transactions found</div>
        ) : (
          transactions
            .filter((tx) => {
              if (seen.has(tx.transactionId)) return false
              seen.add(tx.transactionId)
              return true
            })
            .slice(0, 3)
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
