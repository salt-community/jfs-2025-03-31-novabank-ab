import ThreeDotsIcon from '@/assets/ThreeDotsIcon'
import { useCancelTransaction } from '@/hooks/useCancelTransaction'
import { useEffect, useRef, useState } from 'react'
import DetailsModal from './DetailsModal'

type ScheduledTransactionMenuProps = {
  transactionId: string
}

export default function ScheduledTransactionMenu({
  transactionId,
}: ScheduledTransactionMenuProps) {
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
  const [showDetailsModal, setShowDetailsModal] = useState(false)

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

  const handleMenuItem = (transactionId: string, menuOption: string) => {
    switch (menuOption) {
      case 'Cancel':
        handleCancel(transactionId)
        break
      case 'Details':
        setShowDetailsModal(true)
        break
      default:
        break
    }
  }
  return (
    <>
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
              className="text-center hover:bg-gray-100"
              style={{ padding: '10px', cursor: 'pointer' }}
              onClick={() => handleMenuItem(transactionId, 'Details')}
            >
              Details
            </div>
            <div
              className="text-center hover:bg-gray-100"
              style={{ padding: '10px', cursor: 'pointer' }}
              onClick={() => handleMenuItem(transactionId, 'Cancel')}
            >
              Cancel
            </div>
          </div>
        )}
        {showDetailsModal && <DetailsModal />}
      </div>
    </>
  )
}
