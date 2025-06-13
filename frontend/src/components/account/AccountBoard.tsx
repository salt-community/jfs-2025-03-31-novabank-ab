import { TransactionItem } from '../generic/'
import type { AccountDetails } from '@/types'

type AccountBoardProps = {
  account: AccountDetails
}

export default function AccountBoard({ account }: AccountBoardProps) {
  return (
    <div className="max-w mx-auto px-6 py-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-semibold">{account.name}</h1>
          <p className="mt-4 text-gray-600">Total balance</p>
          <p className="text-4xl font-bold">{account.balance.toFixed(2)}</p>
          <button className="mt-4 px-4 py-2 bg-amber-400 hover:bg-amber-500 rounded-md text-sm shadow">
            + New transfer
          </button>
        </div>

        <div className="border-l pl-8">
          <p className="text-sm text-gray-500">Account holder</p>
          <p className="text-lg ">{account.accountHolder}</p>
          <p className="mt-4 text-sm text-gray-500">Account number</p>
          <p className="text-lg ">{account.number}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg mb-4">Transactions</h2>

        <div className="space-y-2">
          {account.transactions.map((t, index) => (
            <TransactionItem
              key={index}
              name={t.name}
              category={t.category}
              amount={t.amount}
              time={t.time}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
