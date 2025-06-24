import type { TransactionEntry } from '@/hooks/useFetchEntries'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

type TransactionDetailsModalProps = {
  transaction: TransactionEntry
  onClose: () => void
  variant?: 'regular' | 'scheduled'
}

export default function TransactionDetailsModal({
  transaction,
  onClose,
  variant = 'regular',
}: TransactionDetailsModalProps) {
  const { t } = useTranslation('transactionDetails')
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const handleCancel = () => {
    dialogRef.current?.close()
    onClose()
  }

  const isScheduled = variant === 'scheduled'

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

  // Determine if account number type should be shown
  const showAccNoType =
    transaction.type === 'PLUSGIRO' || transaction.type === 'BANKGIRO'

  return (
    <dialog
      ref={dialogRef}
      className="modal cursor-default"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          handleCancel()
        }
      }}
    >
      <div className="modal-box max-h-[90vh] bg-white rounded-lg shadow-lg relative px-6 py-8 max-w-3xl sm:max-w-xl text-[#141414]">
        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black hover:cursor-pointer text-2xl"
          aria-label={t('close')}
        >
          &times;
        </button>

        <div className="mb-4 space-y-2 text-lg p-4">
          <div className="flex items-center justify-center mt-3 mb-10">
            <h2 className="text-2xl">{t('transactionDetails')}</h2>
          </div>
          {transaction.description && (
            <div>
              <p className="text-md font-semibold">{t('description')}</p>
              <p>{transaction.description}</p>
            </div>
          )}
          <div className="flex flex-row justify-between items-center">
            {formattedDate && (
              <div>
                <p className="font-semibold">
                  {isScheduled ? 'Scheduled for' : 'Transaction date'}
                </p>
                <span className="text-md">{formattedDate}</span>
              </div>
            )}
            {transaction.status && (
              <p>
                <p className="font-semibold opacity-50">{transaction.status}</p>
              </p>
            )}
          </div>

          <hr className="my-4" />

          {transaction.transactionId && (
            <p>
              <p className="text-lg mr-2 font-semibold">Transaction ID</p>
              <span>{transaction.transactionId}</span>
            </p>
          )}

          <div className="flex justify-between">
            {transaction.amount && (
              <div>
                <p className="text-md font-semibold">{t('amount')}</p>
                <p> {transaction.amount} kr</p>
              </div>
            )}

            {capitalizedCategory && (
              <div>
                <p className="text-md font-semibold">{t('category')}</p>
                <p>{capitalizedCategory}</p>
              </div>
            )}

            {showAccNoType
              ? transaction.type && (
                  <div>
                    <p className="text-md font-semibold">{t('type')}</p>
                    <p>{transaction.type}</p>
                  </div>
                )
              : ''}
          </div>

          <hr className="my-4" />

          {transaction.userNote && (
            <div>
              <p className="text-md font-semibold"> {t('note')}</p>
              <p>{transaction.userNote}</p>
              <hr className="my-4" />
            </div>
            
          )}


          <div className="flex justify-between">
            {transaction.ocrNumber && (
              <div>
                <p className="text-md font-semibold">{t('ocrNumber')}</p>
                <p>{transaction.ocrNumber}</p>
              </div>
            )}

            {transaction.direction && (
              <div>
                <p className="text-md font-semibold">Flow</p>
                <p>
                  {transaction.direction === 'in'
                    ? t('incoming')
                    : t('outgoing')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  )
}
