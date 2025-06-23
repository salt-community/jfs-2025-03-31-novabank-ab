import TransactionMenu from './TransactionMenu'

type TransactionItemProps = {
  description: string
  theAccount: string | undefined
  accountNoType: string
  amount: number
  time: string
  direction: 'in' | 'out'
  category: string
}

export function TransactionItem({
  description,
  theAccount,
  accountNoType,
  amount,
  time,
  direction,
  category,
}: TransactionItemProps) {
  const isIncoming = direction === 'in'

  // Format the time string to only show date (YYYY-MM-DD)
  const formattedDate = new Date(time).toISOString().slice(0, 10)

  // Capitalize first letter of category
  const capitalizedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : 'No category'
  // Only show if category is PLUSGIRO or BANKGIRO
  const showAccNoType =
    accountNoType === 'PLUSGIRO' || accountNoType === 'BANKGIRO'

  return (
    <div
      className="flex justify-between items-center py-3 border-b last:border-b-0"
      data-testid="transaction-item"
    >
      <div className="flex flex-col">
        <span className="text-base text-gray-800">{description}</span>
        <span className="text-xs text-gray-500">{capitalizedCategory}</span>
        <span className="text-xs text-gray-500">
          {isIncoming ? 'To ' : 'From '} {theAccount}
        </span>
        {showAccNoType && (
          <span className="text-xs text-gray-500 italic">{accountNoType}</span>
        )}
      </div>
      <div className="flex flex-row justify-center align-middle items-center">
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
        <TransactionMenu />
      </div>
    </div>
  )
}
