import type { TransactionEntry } from '@/hooks/useFetchEntries'
import TransactionMenu from './TransactionMenu'

type TransactionItemProps = {
  transaction: TransactionEntry
  variant?: 'regular' | 'scheduled'
}

export function TransactionItem({
  transaction,
  variant = 'regular',
}: TransactionItemProps) {
  const isScheduled = variant === 'scheduled'
  const isIncoming = transaction.direction === 'in'

  // Format the date
  const dateToUse = isScheduled
    ? transaction.date
    : (transaction.scheduledDate ?? transaction.date)

  const formattedDate = dateToUse
    ? new Date(dateToUse).toISOString().slice(0, 10)
    : 'Unknown'

  // Capitalize the category
  const capitalizedCategory = transaction.category
    ? transaction.category.charAt(0).toUpperCase() +
      transaction.category.slice(1).toLowerCase()
    : 'No category'

  // Choose amount format
  const formattedAmount = isIncoming
    ? `+${transaction.amount.toFixed(2)}`
    : `-${Math.abs(transaction.amount).toFixed(2)}`

  const amountColor = isIncoming ? 'text-green-500' : 'text-gray-800'

  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <div className="flex flex-col">
        <span className="text-base text-gray-800">
          {transaction.description}
        </span>
        <span className="text-xs text-gray-500">{capitalizedCategory}</span>
        {!isScheduled && (
          <span className="text-xs text-gray-500">
            {isIncoming ? 'To ' : 'From '} {transaction.accountType}
          </span>
        )}
      </div>
      <div className="flex flex-row justify-center align-middle items-center">
        <div className="flex flex-col items-end">
          <span className={`text-base font-medium ${amountColor}`}>
            {formattedAmount}
          </span>
          <span className="text-xs text-gray-400">
            {isScheduled ? 'Scheduled for' : ''} {formattedDate}
          </span>
        </div>
        <TransactionMenu
          transaction={transaction}
          allowCancel={variant === 'scheduled'}
          variant={variant}
        />
      </div>
    </div>
  )
}
