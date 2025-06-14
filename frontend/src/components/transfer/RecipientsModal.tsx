import { useEffect, useRef, useState } from 'react'
import TransferAccountItem from './TransferAccountItem'
import type { Account } from '@/types'

type RecipientsModalProps = {
  bankAccounts: Array<Account>
  fromAccount: Account | null
  onSubmit: (recipient: Account | null | string) => void
  onClose: () => void
}

export default function RecipientsModal({
  bankAccounts,
  fromAccount,
  onSubmit,
  onClose,
}: RecipientsModalProps) {
  const [, setToAccount] = useState<Account | null>(null)
  const [viewMode, setViewMode] = useState<
    'Saved recipients' | 'New recipient'
  >('Saved recipients')
  const [newRecipient, setNewRecipient] = useState('')
  const [accNoType, setAccNoType] = useState('')
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [errors, setErrors] = useState<{
    accNoTypeError?: string
    recipientError?: string
  }>({})

  // Show modal on mount
  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const handleCancel = () => {
    dialogRef.current?.close()
    onClose()
  }

  function isValidAccountNumber(type: string, value: string): boolean {
    const cleaned = value.replace(/[\s-]/g, '') // remove spaces and dashes

    switch (type) {
      case 'Plusgiro':
        return /^\d{2,8}$/.test(cleaned) || /^\d{2,7}-\d{1}$/.test(value) // original or hyphenated
      case 'Bankgiro':
        return /^\d{7,8}$/.test(cleaned) || /^\d{3,4}-\d{4}$/.test(value)
      case 'Other account':
        return /^\d{4,30}$/.test(cleaned) // Swedish bank account numbers vary greatly by bank
      default:
        return false
    }
  }

  const handleRecipientSubmit = (account: Account | string) => {
    const newErrors: typeof errors = {}

    if (viewMode === 'New recipient') {
      if (!accNoType)
        newErrors.accNoTypeError = 'Please select an account number type'

      if (!newRecipient) {
        newErrors.recipientError = 'Account number is required'
      } else if (!isValidAccountNumber(accNoType, newRecipient)) {
        newErrors.recipientError = `Invalid ${accNoType} number`
      }
      setErrors(newErrors)
      if (Object.keys(newErrors).length > 0) return
      if (typeof account === 'string') {
        setNewRecipient(newRecipient.trim())
        onSubmit(newRecipient.trim())
      }
    } else if (typeof account === 'object') {
      setToAccount(account)
      onSubmit(account)
    }

    dialogRef.current?.close()
    onClose()
  }

  return (
    <dialog ref={dialogRef} className="modal">
      <div
        className="modal-box max-h-[90vh] bg-white rounded-lg shadow-lg relative px-6 py-8 max-w-3xl 
                      sm:max-w-xl mx-auto text-[#141414] font-old"
      >
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex text-sm mt-5 bg-gray-100 w-70 mx-auto rounded-md">
          <button
            type="button"
            className={`w-35 duration-200 px-3 py-1 rounded-l-md ${
              viewMode === 'Saved recipients'
                ? 'bg-gray-200 pointer-events-none'
                : 'bg-transparent hover:cursor-pointer shadow-sm'
            }`}
            onClick={() => {
              setToAccount(null)
              setNewRecipient('')
              setViewMode('Saved recipients')
            }}
          >
            Saved recipients
          </button>

          <button
            type="button"
            className={`w-35 duration-200 px-3 py-1 rounded-r-md ${
              viewMode === 'New recipient'
                ? 'bg-gray-200 pointer-events-none'
                : 'bg-transparent hover:cursor-pointer shadow-sm'
            }`}
            onClick={() => {
              setToAccount(null)
              setNewRecipient('')
              setViewMode('New recipient')
            }}
          >
            New recipient
          </button>
        </div>

        <div className="space-y-2 p-10">

          {viewMode === 'Saved recipients' ? (
            <div className="h-80">
              <p className="mb-4 text-xl">My bank accounts</p>
              {bankAccounts.map((account) => {
                const isDisabled = fromAccount?.number === account.number

                return (
                  <div>
                    <button
                      key={account.number}
                      type="button"
                      onClick={() => {
                        if (isDisabled) return
                        handleRecipientSubmit(account)
                      }}
                      className={` w-full py-1 rounded 
                    ${
                      isDisabled
                        ? ' text-gray-400 cursor-not-allowed'
                        : ' hover:cursor-pointer'
                    }`}
                      disabled={isDisabled}
                    >
                      <TransferAccountItem
                        key={account.number}
                        account={account}
                        isDisabled={isDisabled}
                      />
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="h-80 space-y-5">
              {/* New account */}
              <div className="relative w-full">
                <input
                  id="newAccount"
                  type="text"
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className={`peer hover:cursor-pointer  text-black rounded 
                        p-4 w-full text-left  bg-white outline focus:outline-2
                        ${errors.recipientError ? ' outline-red-600 focus:outline-red-600  ' : ' outline-gray-500 focus:outline-black'}
                        `}
                />

                <label
                  htmlFor="newAccount"
                  className={`absolute hover:cursor-pointer left-4 px-1  transition-all duration-200 bg-white
                        ${
                          newRecipient
                            ? '-top-2.5 text-sm text-black font-semibold'
                            : 'top-4 text-base text-gray-400 bg-transparent'
                        }
                        ${errors.recipientError ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-semibold
                        peer-focus:bg-white`}
                >
                  Account number
                </label>
                {errors.recipientError && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.recipientError}
                  </p>
                )}
              </div>

              {/* Account number type */}
              <div className="relative w-full">
                <select
                  id="accNoType"
                  name="accNoTypes"
                  value={accNoType || ''}
                  onChange={(e) => {
                    setAccNoType(e.target.value)
                  }}
                  className={`peer hover:cursor-pointer rounded p-4 w-full outline outline-gray-500 
                              focus:outline-2 focus:outline-black text-left bg-white
                              ${errors.accNoTypeError ? 'outline outline-red-600 focus:outline-red-600 ' : ''}
                              border-r-15 border-transparent
                              ${accNoType ? ' text-black' : 'text-gray-400'}`}
                >
                  <option value="" className="text-gray-400">
                    Select an account number type
                  </option>
                  <option className="text-black" value="Plusgiro">
                    Plusgiro
                  </option>
                  <option className="text-black" value="Bankgiro">
                    Bankgiro
                  </option>
                  <option className="text-black" value="Other account">
                    Other account
                  </option>
                </select>

                <label
                  htmlFor="accNoType"
                  className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none
              ${
                accNoType
                  ? '-top-2.5 font-semibold text-sm text-black'
                  : 'top-4 text-base text-gray-400 bg-transparent pr-20'
              }
              ${errors.accNoTypeError ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
              peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
              peer-focus:bg-white `}
                >
                  Account number type
                </label>
                {errors.accNoTypeError && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.accNoTypeError}
                  </p>
                )}
              </div>

              {/* Done button */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => handleRecipientSubmit(newRecipient)}
                  className="bg-[#FFB20F] hover:bg-[#F5A700] hover:cursor-pointer w-full text-black font-semibold shadow-sm px-5 py-2 rounded transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  )
}
