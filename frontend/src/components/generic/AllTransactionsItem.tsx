type AllTransactionsItemProps = {
  name: string
  category: string
  amount: number
  time: string
  direction: 'in' | 'out'
}

export function AllTransactionsItem({
  name,
  category,
  amount,
  time,
  direction,
}: AllTransactionsItemProps) {
  const isIncoming = direction === 'in'

  return (
    <div
      className="flex justify-between items-center py-3 border-b last:border-b-0"
      data-testid="transaction-item"
    >
      <div className="flex flex-col">
        <span className="text-base text-gray-800">{name}</span>
        <span className="text-xs text-gray-500">{category}</span>
      </div>
      <div className="flex flex-col items-end">
        <span
          className={`text-base font-medium ${
            isIncoming ? 'text-green-500' : 'text-gray-800'
          }`}
        >
          {isIncoming ? `+${amount.toFixed(2)}` : `-${amount.toFixed(2)}`}
        </span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  )
}
