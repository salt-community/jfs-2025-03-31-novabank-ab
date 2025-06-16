import ThreeDotsIcon from '@/assets/ThreeDotsIcon'
import { useEffect, useRef, useState } from 'react'

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
          <span className="text-base font-medium text-gray-800">
            {`-${Math.abs(amount).toFixed(2)}`}
          </span>
          <span className="text-xs text-gray-400">
            {scheduledDate.split('T')[0]}
          </span>
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
              style={{
                position: 'absolute',
                right: 0,
                top: '30px',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
              }}
            >
              <div
                style={{ padding: '10px', cursor: 'pointer' }}
                onClick={() => console.log('Edit')}
              >
                Edit
              </div>
              <div
                style={{ padding: '10px', cursor: 'pointer' }}
                onClick={() => console.log('Delete')}
              >
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
