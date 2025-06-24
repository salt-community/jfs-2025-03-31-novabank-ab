import ThreeDotsIcon from '@/assets/ThreeDotsIcon'
import { useCancelTransaction } from '@/hooks/useCancelTransaction'
import { useEffect, useRef, useState } from 'react'
import TransactionDetailsModal from './TransactionDetailsModal'
import type { TransactionEntry } from '@/hooks/useFetchEntries'

type TransactionMenuProps = {
  transaction: TransactionEntry
  allowCancel?: boolean
  variant?: 'regular' | 'scheduled'
}

export default function TransactionMenu({
  transaction,
  allowCancel = false,
  variant = 'regular',
}: TransactionMenuProps) {
  const [openMenu, setOpenMenu] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showConfirmCancel, setShowConfirmCancel] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const cancelTransaction = useCancelTransaction()

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

  const handleCancelConfirmed = () => {
    cancelTransaction.mutate(transaction.transactionId, {
      onSuccess: () => {
        alert('Transaction canceled!')
        setShowConfirmCancel(false)
      },
      onError: (error) => {
        alert(
          'Failed: ' + (error instanceof Error ? error.message : String(error)),
        )
        setShowConfirmCancel(false)
      },
    })
  }

  const handleMenuItem = (menuOption: string) => {
    switch (menuOption) {
      case 'Details':
        setShowDetailsModal(true)
        break
      case 'Cancel':
        setShowConfirmCancel(true)
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
            className="w-40 bg-white"
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
              onClick={() => handleMenuItem('Details')}
            >
              Details
            </div>
            {allowCancel && (
              <div
                className="text-center hover:bg-gray-100 text-red-600"
                style={{ padding: '10px', cursor: 'pointer' }}
                onClick={() => handleMenuItem('Cancel')}
              >
                Cancel
              </div>
            )}
          </div>
        )}
        {showDetailsModal && (
          <TransactionDetailsModal
            transaction={transaction}
            onClose={() => setShowDetailsModal(false)}
            variant={variant}
          />
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmCancel && (
        <dialog
          open
          className="modal modal-open"
          style={{ zIndex: 2000 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowConfirmCancel(false)
            }
          }}
        >
          <form
            method="dialog"
            className="modal-box max-w-sm bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <div className="alert alert-warning flex justify-center items-center space-x-4 bg-white shadow-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-15 w-15 stroke-current text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-lg font-semibold">
                Are you sure you want to cancel this transaction?
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                type="button"
                className="btn  bg-gray-200 border-none hover:bg-gray-300"
                onClick={() => setShowConfirmCancel(false)}
              >
                No
              </button>
              <button
                type="button"
                className="btn bg-[#FFB20F] border-none hover:bg-[#F5A700]"
                onClick={handleCancelConfirmed}
              >
                Yes
              </button>
            </div>
          </form>
        </dialog>
      )}
    </>
  )
}
