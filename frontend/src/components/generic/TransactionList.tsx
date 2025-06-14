import { useNavigate } from '@tanstack/react-router'
import { TransactionItem } from '../generic'
import type { Transaction } from '@/types'

type TransactionListProps = {
  transactions: Array<Transaction>
}

export function TransactionList({ transactions }: TransactionListProps) {
  const navigate = useNavigate()

  return (
    <div
     
      data-testid="transaction-list"
    >
      <div className="flex flex-row justify-between items-baseline">
         <h1 className="text-2xl mt-20 mb-5">Recent transactions</h1>
        <a
          onClick={() => navigate({ to: '/transactions' })}
          className="text-md text-gray-500 hover:text-gray-900 hover:cursor-pointer"
        >
          See all
        </a>
      </div>

      <div className=" p-1">
        {transactions.slice(0, 3).map((transaction) => (
          <TransactionItem
            key={transaction.id}
            name={transaction.name}
            category={transaction.category}
            amount={transaction.amount}
            time={transaction.time}
          />
        ))}
      </div>
    </div>
  )
}
