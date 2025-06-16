import ThreeDotsIcon from '@/assets/ThreeDotsIcon'
export type ScheduledTransactionItemProps = {
  fromAccountId: string
  toAccountId: string
  amount: number
  scheduledDate: string
  description: string
  userNote: string
  ocrNumber: string
}
export function ScheduledTransactionItem({
  amount,
  description,
  scheduledDate,
  userNote,
}: ScheduledTransactionItemProps) {
  return (
    <div
      className="flex justify-between items-center py-3 border-b last:border-b-0"
      data-testid="transaction-item"
    >
      <div className="flex flex-col">
        <span className="text-base text-gray-800">{description}</span>
        <span className="text-xs text-gray-500">Note: {userNote}</span>
      </div>
      <div className="flex flex-row justify-center align-middle items-center">
        <div className="flex flex-col items-end">
          <span className={`text-base font-medium text-gray-800'`}>
            {`-${Math.abs(amount).toFixed(2)}`}
          </span>
          <span className="text-xs text-gray-400">
            {scheduledDate.split('T')[0]}
          </span>
        </div>
        <div className="ml-4">
          <ThreeDotsIcon width={24}></ThreeDotsIcon>
        </div>
      </div>
    </div>
  )
}
