import { useNavigate } from '@tanstack/react-router'
import { TransactionItem } from '../generic'
import type { Transaction } from '@/types'

type TransactionListProps = {
  transactions: Array<Transaction>
}

export function TransactionList({ transactions }: TransactionListProps) {
  const navigate = useNavigate()

  return (
    <div className=" mt-10" data-testid="transaction-list">
      <div className="flex flex-row justify-between items-baseline">
        <h1 className="text-2xl mb-5">Recent transactions</h1>
        <a
          onClick={() => navigate({ to: '/transactions' })}
          className="text-md text-black px-5 hover:cursor-pointer hover:underline underline-offset-5 hover:cursor-pointer"
        >
          See all
        </a>
      </div>

      <div
        onClick={() => navigate({ to: '/transactions' })}
        className=" hover:cursor-pointer px-5 border-1 border-gray-100 shadow-sm p-1"
      >
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
