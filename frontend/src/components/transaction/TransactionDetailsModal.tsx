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
  direction?: 'in' | 'out'
  category?: string
  status?: string
  onClose?: () => void
}

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
            <h2 className="text-2xl font-semibold">Transaction Details</h2>
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
              <span className="text-lg mr-2">ID:</span>
              <span className="font-bold">{transactionId}</span>
            </p>
          )}
          <div className="flex flex-row justify-between">
            {amount !== undefined && (
              <div>
                <p>
                  <span className="text-md">Amount</span>
                </p>
                <p className="font-extrabold"> {amount} kr</p>
              </div>
            )}
            {type && (
              <div>
                <p>
                  <span className="text-md">Type</span>
                </p>
                <p className="font-semibold opacity-50">{type}</p>
              </div>
            )}
          </div>
          <hr className="mt-3 mb-3" />
          {description && (
            <div>
              <p>
                <span className="text-md">Description</span>
              </p>
              <p className="font-semibold">{description}</p>
            </div>
          )}
          {category && (
            <div>
              <p>
                <span className="text-md">Category</span>
              </p>
              <p className="font-semibold">{category}</p>
            </div>
          )}
          {userNote && (
            <div>
              <p>
                <span className="text-md">Note</span>
              </p>
              <p className="font-semibold">{userNote}</p>
            </div>
          )}
          <hr className="mt-3 mb-3" />
          {fromAccountId && (
            <div>
              <p>
                <span className="text-md">From Account</span>
                <p className="font-semibold">{fromAccountId}</p>
              </p>
            </div>
          )}
          {toAccountId && (
            <div>
              <p>
                <span className="text-md">To Account</span>
              </p>
              <p className="font-semibold">{toAccountId}</p>
            </div>
          )}
          <hr className="mt-3 mb-3" />
          {scheduledDate && (
            <p>
              <span className="font-medium">Scheduled Date:</span>{' '}
              {scheduledDate}
            </p>
          )}
          {ocrNumber && (
            <div>
              <p>
                <span className="text-md">OCR Number</span>
              </p>
              <p className="font-semibold">{ocrNumber}</p>
            </div>
          )}
          {accountNoType && (
            <p>
              <span className="font-medium">Account No Type:</span>{' '}
              {accountNoType}
            </p>
          )}
          {theAccount && (
            <p>
              <span className="font-medium">Account:</span> {theAccount}
            </p>
          )}

          {direction && (
            <p>
              <span className="font-medium">Direction:</span> {direction}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:opacity-70 transition hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
