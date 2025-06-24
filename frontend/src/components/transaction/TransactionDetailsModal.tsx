import { useTranslation } from 'react-i18next'

type TransactionModalData = {
  transactionId?: string
  fromAccountId?: string
  toAccountId?: string
  date?: string // used in TransactionFromId
  scheduledDate?: string // used in ScheduledTransactionItemProps
  amount?: number
  description?: string
  userNote?: string
  ocrNumber?: string
  type?: string // for TransactionFromId and Scheduled
  accountNoType?: string // AllTransactionsItem and Scheduled
  theAccount?: string
  time?: string
  direction?: string
  category?: string
  status?: string
  onClose?: () => void
}

/// USAGE EXAMPLE:

/*
We render it by passing the props of a transaction, and also we need to give it a callback allowing the modal to close.

The Modal should be conditionally rendereed by a state (like {modalTransactionDetailShowing && (<Transaction....... )

So then we can toggle that state from the callback we are passing to it

        <TransactionDetailsModal
          {...hardcodedTransactionFromId}
          onClose={() => setModalTransactionDetalShowing(false)}

*/
///

export const TransactionDetailsModal: React.FC<TransactionModalData> = ({
  amount,
  description,
  accountNoType,
  date,
  direction,
  fromAccountId,
  ocrNumber,
  scheduledDate,
  theAccount,
  time,
  toAccountId,
  transactionId,
  type,
  userNote,
  category,
  status,
  onClose,
}) => {
  const { t } = useTranslation('transactionDetails')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
      <div
        className="
          bg-white
          rounded-lg
          shadow-lg
          w-full
          max-w-lg
          p-6
          max-h-[80vh]
          overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex justify-end items-center mb- text-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 space-y-1 text-lg">
          <div className="flex items-center justify-center mb-4 mt-4">
            <h2 className="text-2xl font-semibold">
              {t('transactionDetails')}
            </h2>
          </div>
          <div className="flex flex-row justify-between">
            {date && (
              <div>
                <p>
                  <span className="text-md">{date}</span>
                </p>
                {time && (
                  <p>
                    <span className="font-medium"> {time}</span>
                  </p>
                )}
              </div>
            )}
            {status && (
              <p>
                <p className="font-semibold opacity-50">{status}</p>
              </p>
            )}
          </div>
          <hr className="mt-3 mb-3" />
          {transactionId && (
            <p>
              <span className="text-lg mr-2">{t('id')}</span>
              <span className="font-bold">{transactionId}</span>
            </p>
          )}
          <div className="flex flex-row justify-between">
            {amount !== undefined && (
              <div>
                <p>
                  <span className="text-md">{t('amount')}</span>
                </p>
                <p className="font-extrabold"> {amount} kr</p>
              </div>
            )}
            {type && (
              <div>
                <p>
                  <span className="text-md">{t('type')}</span>
                </p>
                <p className="font-semibold opacity-50">{type}</p>
              </div>
            )}
            {accountNoType && (
              <div>
                <p>
                  <span className="text-md">{t('type')}</span>
                </p>
                <p className="font-semibold opacity-50">{accountNoType}</p>
              </div>
            )}
          </div>
          <hr className="mt-3 mb-3" />
          {description && (
            <div>
              <p>
                <span className="text-md">{t('description')}</span>
              </p>
              <p className="font-semibold">{description}</p>
            </div>
          )}
          {category && (
            <div>
              <p>
                <span className="text-md">{t('category')}</span>
              </p>
              <p className="font-semibold">{category}</p>
            </div>
          )}
          {userNote && (
            <div>
              <p>
                <span className="text-md">{t('note')}</span>
              </p>
              <p className="font-semibold">{userNote}</p>
            </div>
          )}
          <hr className="mt-3 mb-3" />
          {fromAccountId && (
            <div>
              <p>
                <span className="text-md">{t('fromAccount')}</span>
                <p className="font-semibold">{fromAccountId}</p>
              </p>
            </div>
          )}
          {toAccountId && (
            <div>
              <p>
                <span className="text-md">{t('toAccount')}</span>
              </p>
              <p className="font-semibold">{toAccountId}</p>
            </div>
          )}
          {theAccount && (
            <div>
              <p>
                <span className="text-md">{t('account')}</span>
              </p>
              <p className="font-semibold">{theAccount}</p>
            </div>
          )}
          <hr className="mt-3 mb-3" />
          {scheduledDate && (
            <div>
              <p>
                <span className="font-medium">{t('scheduledDate')}</span>
              </p>
              <p className="font-semibold">{scheduledDate}</p>
            </div>
          )}
          {ocrNumber && (
            <div>
              <p>
                <span className="text-md">{t('ocrNumber')}</span>
              </p>
              <p className="font-semibold">{ocrNumber}</p>
            </div>
          )}

          {direction && (
            <div>
              <p>
                <span className="text-md">{t('direction')}</span>
                <p className="font-semibold">
                  {direction === 'in' ? t('incoming') : t('outgoing')}
                </p>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:opacity-70 transition hover:cursor-pointer"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  )
}
