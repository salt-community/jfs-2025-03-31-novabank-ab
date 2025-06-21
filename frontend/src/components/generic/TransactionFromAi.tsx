import type { TransactionFromId } from '@/types'
import { useTranslation } from 'react-i18next'

export function TransactionFromAi({
  amount,
  // category,
  date,
  description,
  // fromAccountId,
  // ocrNumber,
  // status,
  // toAccountId,
  // transactionId,
  // type,
  userNote,
}: TransactionFromId) {
  const { t } = useTranslation('accounts')
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <div className="flex flex-col">
        <span className="text-base text-gray-800">{description}</span>
        <span className="text-xs text-gray-500">
          {t('notes')}: {userNote}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-base font-medium text-gray-800`}>
          {`${amount.toFixed(2)}`}
        </span>
        <span className="text-xs text-gray-400">
          {date.slice(0, 16).replace('T', ' ')}
        </span>
      </div>
    </div>
  )
}
