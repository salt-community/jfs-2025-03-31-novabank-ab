import type { TransactionEntry } from '@/hooks/useFetchEntries'
import TransactionMenu from './TransactionMenu'
import { useTranslation } from 'react-i18next'

type TransactionAccItemProps = {
  transaction: TransactionEntry
  variant?: 'regular' | 'scheduled'
}

export function TransactionAccItem({
  transaction,
  variant = 'regular',
}: TransactionAccItemProps) {
  const { t } = useTranslation('transactionDetails')
  const isIncoming = transaction.direction === t('in')

  const formattedDate = transaction.date
    ? new Date(transaction.date).toISOString().slice(0, 10)
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
      </div>
      <div className="flex flex-row justify-center align-middle items-center">
        <div className="flex flex-col items-end">
          <span className={`text-base font-medium ${amountColor}`}>
            {formattedAmount}
          </span>
          <span className="text-xs text-gray-400">{formattedDate}</span>
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
