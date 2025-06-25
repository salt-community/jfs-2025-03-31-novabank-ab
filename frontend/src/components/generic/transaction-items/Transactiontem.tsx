import type { TransactionEntry } from '@/hooks/useFetchEntries'
import TransactionMenu from './TransactionMenu'
import { useTranslation } from 'react-i18next'

type TransactionItemProps = {
  transaction: TransactionEntry
  variant?: 'regular' | 'scheduled'
}

export function TransactionItem({
  transaction,
  variant = 'regular',
}: TransactionItemProps) {
  const { t } = useTranslation('transactionDetails')
  const isScheduled = variant === t('scheduled')
  const isIncoming = transaction.direction === t('in')

  // Format the date
  const dateToUse = isScheduled
    ? transaction.date
    : (transaction.scheduledDate ?? transaction.date)

  const formattedDate = dateToUse
    ? new Date(dateToUse).toISOString().slice(0, 10)
    : t('unknown')

  // Capitalize the category
  const capitalizedCategory = transaction.category
    ? transaction.category.charAt(0).toUpperCase() +
      transaction.category.slice(1).toLowerCase()
    : t('noCategory')

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
            {isIncoming ? t('to') : t('from')} {transaction.accountType}
          </span>
        )}
      </div>
      <div className="flex flex-row justify-center align-middle items-center">
        <div className="flex flex-col items-end">
          <span className={`text-base font-medium ${amountColor}`}>
            {formattedAmount}
          </span>
          <span className="text-xs text-gray-400">
            {isScheduled ? t('scheduledFor') : ''} {formattedDate}
          </span>
        </div>
        <TransactionMenu
          transaction={transaction}
          allowCancel={variant === t('scheduled')}
          variant={variant}
        />
      </div>
    </div>
  )
}
