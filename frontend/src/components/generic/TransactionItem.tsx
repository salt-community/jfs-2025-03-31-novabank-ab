type TransactionItemProps = {
  accType: string
  accNoType: string
  amount: number
  date: string
  direction: 'in' | 'out'
  category: string
}

export function TransactionItem({
  accType,
  accNoType,
  amount,
  date,
  direction,
  category
}: TransactionItemProps) {
  const isIncoming = direction === 'in'

  // Format date to YYYY-MM-DD
  const formattedDate = date.split('T')[0]

  // Only show if category is PLUSGIRO or BANKGIRO
  const showAccNoType = accNoType === 'PLUSGIRO' || accNoType === 'BANKGIRO'

  return (
    <div
      className="flex justify-between items-center py-3 border-b last:border-b-0"
      data-testid="transaction-item"
    >
      <div className="flex flex-col">
        <span className="text-base text-gray-800">{accType}</span>
        <span className="text-xs text-gray-500">{category === null ? 'null' : category}</span>
        {showAccNoType && (
          <span className="text-xs text-gray-500 italic">{accNoType}</span>
        )}
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
