// import { useTranslation } from 'react-i18next'
import ScheduledTransactionMenu from './ScheduledTransactionMenu'

export type ScheduledTransactionItemProps = {
  transactionId: string
  fromAccountId: string
  toAccountId: string
  amount: number
  scheduledDate: string
  description: string
  ocrNumber: string
  accountNoType: string
  category: string
}

export function ScheduledTransactionItem({
  transactionId,
  amount,
  description,
  scheduledDate,
  category,
  accountNoType,
}: ScheduledTransactionItemProps) {
  // const { t } = useTranslation('accounts')

  // Always outgoing for this component, so show negative amount
  const formattedAmount = `-${Math.abs(amount).toFixed(2)}`
  const amountColor = 'text-gray-800'

  // Format date to YYYY-MM-DD
  const formattedDate = scheduledDate.split('T')[0]

  // Show accountNoType only if it's "plus" or "bankgiro"
  const showAccountNoType =
    accountNoType === 'PLUSGIRO' || accountNoType === 'BANKGIRO'

  // Capitalize first letter of category
  const capitalizedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : 'No category'

  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <div className="flex flex-col">
        <span className="text-base text-gray-800">{description}</span>
        <span className="text-xs text-gray-500">{capitalizedCategory}</span>
        {showAccountNoType && (
          <span className="text-xs text-gray-500 italic">{accountNoType}</span>
        )}
      </div>
      <div className="flex flex-row justify-center align-middle items-center">
        <div className="flex flex-col items-end">
          <span className={`text-base font-medium ${amountColor}`}>
            {formattedAmount}
          </span>
          <span className="text-xs text-gray-400">
            Scheduled for {formattedDate}
          </span>
        </div>

        <ScheduledTransactionMenu transactionId={transactionId} />
      </div>
    </div>
  )
}
