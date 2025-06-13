import { useQuery } from '@tanstack/react-query'
import TransactionItem from '@/components/generic/TransactionItem'

type Transaction = {
  id: string;
  name: string
  category: string
  amount: number
  time: string
}

async function fetchTransactions(): Promise<Array<Transaction>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Mom',
          category: 'Incoming',
          amount: 300,
          time: '2025-06-12 14:23',
        },
        {
          id: '2',
          name: 'Dad',
          category: 'Outgoing',
          amount: -2500,
          time: '2025-06-10 09:00',
        },
        {
          id: '3',
          name: 'Joe Biden',
          category: 'Outgoing',
          amount: -4000,
          time: '2025-06-09 08:15',
        },
      ])
    })
  })
}

export default function TransactionsPage() {
  const {
    data: transactions = [],
    isLoading,
    isError
  } = useQuery<Array<Transaction>>({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  })

  if (isLoading) return <div className="p-8">Loading</div>
  if (isError)
    return <div className="p-8 text-red-500">Error loading transactions</div>

  return (
    <div className=" mx-auto">
      <h1 className="text-3xl mb-10">All Transactions</h1>
      <div>
        {transactions.length === 0 ? (
          <div className="p-4 text-gray-500">No transactions found</div>
        ) : (
          transactions.map((tx) => (
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
