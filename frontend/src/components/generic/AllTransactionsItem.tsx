type AllTransactionsItemProps = {
  description: string
  sender: string | undefined
  accountNoType: string
  amount: number
  time: string
  direction: 'in' | 'out'
}

export function AllTransactionsItem({
  description,
  sender,
  accountNoType,
  amount,
  time,
  direction,
}: AllTransactionsItemProps) {
  const isIncoming = direction === 'in'

  // Format the time string to only show date (YYYY-MM-DD)
  const formattedDate = new Date(time).toISOString().slice(0, 10)

  return (
    <div
      className="flex justify-between items-center py-3 border-b last:border-b-0"
      data-testid="transaction-item"
    >
      <div className="flex flex-col">
        <span className="text-base text-gray-800">{description}</span> 
        <span className="text-xs text-gray-500">From {sender}</span>
        {accountNoType === 'INTERNAL_TRANSFER' ? '' : (<span className="text-xs text-gray-500 italic">{accountNoType}</span>)}
      </div>
      <div className="flex flex-col items-end">
        <span
          className={`text-base font-medium ${
            isIncoming ? 'text-green-500' : 'text-gray-800'
          }`}
        >
          {isIncoming ? `+${amount.toFixed(2)}` : `-${amount.toFixed(2)}`}
        </span>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>
    </div>
  )
}
