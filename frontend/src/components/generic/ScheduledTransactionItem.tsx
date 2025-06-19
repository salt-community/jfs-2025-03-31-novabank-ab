import ThreeDotsIcon from '@/assets/ThreeDotsIcon'
import { useEffect, useRef, useState } from 'react'
import { useCancelTransaction } from '@/hooks/useCancelTransaction'
import { useTranslation } from 'react-i18next'

export type ScheduledTransactionItemProps = {
  transactionId: string
  fromAccountId: string
  toAccountId: string
  amount: number
  scheduledDate: string
  description: string
  ocrNumber: string
  accountNoType: string 
}

export function ScheduledTransactionItem({
  transactionId,
  amount,
  description,
  scheduledDate,
 
  accountNoType,
}: ScheduledTransactionItemProps) {
  const { t } = useTranslation('accounts')
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false)
      }
    }

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openMenu])

  const cancelTransaction = useCancelTransaction()

  const handleCancel = (transactionId: string) => {
    cancelTransaction.mutate(transactionId, {
      onSuccess: () => {
        alert('Transaction canceled!')
      },
      onError: (error) => {
        alert(
          'Failed: ' + (error instanceof Error ? error.message : String(error)),
        )
      },
    })
  }

  // Always outgoing for this component, so show negative amount
  const formattedAmount = `-${Math.abs(amount).toFixed(2)}`
  const amountColor = 'text-gray-800'

  // Format date to YYYY-MM-DD
  const formattedDate = scheduledDate.split('T')[0]

  // Show accountNoType only if it's "plus" or "bankgiro"
  const showAccountNoType =
    accountNoType === 'PLUSGIRO' || accountNoType === 'BANKGIRO'

  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <div className="flex flex-col">
        <span className="text-base text-gray-800">{description}</span>
       
        {showAccountNoType && (
          <span className="text-xs text-gray-500 italic">{accountNoType}</span>
        )}
      </div>
      <div className="flex flex-row justify-center align-middle items-center">
        <div className="flex flex-col items-end">
          <span className={`text-base font-medium ${amountColor}`}>
            {formattedAmount}
          </span>
          <span className="text-xs text-gray-400">Created on {formattedDate}</span>
        </div>

        <div
          style={{ cursor: 'pointer' }}
          className="ml-4 relative"
          onClick={() => setOpenMenu(!openMenu)}
          ref={menuRef}
        >
          <ThreeDotsIcon width={24} />
          {openMenu && (
            <div
              className="w-50 bg-white"
              style={{
                position: 'absolute',
                right: 0,
                top: '30px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
              }}
            >
              <div
                className="text-center"
                style={{ padding: '10px', cursor: 'pointer' }}
                onClick={() => handleCancel(transactionId)}
              >
                {t('cancelTransaction')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
