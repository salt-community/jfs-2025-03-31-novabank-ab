import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

type Account = {
  accountName: string
  accountNumber: string
  balance: number
}

type RecipientsModalProps = {
  bankAccounts: Array<Account>
  fromAccount: Account | null
  onSubmit: (toAccount: Account | null) => void
  onClose: () => void
}

export default function RecipientsModal({
  bankAccounts,
  fromAccount,
  onSubmit,
  onClose,
}: RecipientsModalProps) {
  const [validationError, setValidationError] = useState('')
  const [toAccount, setToAccount] = useState<Account | null>(null)
  const [viewMode, setViewMode] = useState<
    'Saved recipients' | 'New recipient'
  >('Saved recipients')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [newRecipient, setNewRecipient] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const dialogRef = useRef<HTMLDialogElement | null>(null)

  // Show modal on mount
  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  // Close modal on successful mutation
  //   useEffect(() => {
  //     if (mutation.isSuccess) {
  //       dialogRef.current?.close()
  //       onClose()
  //     }
  //   }, [mutation.isSuccess])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValidationError('')
    onSubmit(toAccount)

    // if (!newRoutineType) {
    //   const msg = 'Please pick a routine type!'
    //   setValidationError(msg)
    //   return
    // }

    // mutation.mutate(
    //   {
    //     id,
    //     requestBody: {
    //       dateTime: newDateTime,
    //       routineType: newRoutineType,
    //       productsUsed: newProductsUsed,
    //       notes: newNotes,
    //     },
    //   },
    //   {
    //     onSuccess: () => {
    //       toast.success('Log updated successfully!')
    //       dialogRef.current?.close()
    //       onClose()
    //     },
    //   },
    // )
  }

  const handleCancel = () => {
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
            className={`w-35 duration-200 px-3 py-1 rounded-l-md ${
              viewMode === 'Saved recipients'
                ? 'bg-gray-200 '
                : 'bg-transparent hover:cursor-pointer shadow-sm'
            }`}
            onClick={() => setViewMode('Saved recipients')}
          >
            Saved recipients
          </button>

          <button
            className={`w-35 duration-200 px-3 py-1 rounded-r-md ${
              viewMode === 'New recipient'
                ? 'bg-gray-200 '
                : 'bg-transparent hover:cursor-pointer shadow-sm'
            }`}
            onClick={() => setViewMode('New recipient')}
          >
            New recipient
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 p-10">
          {/* Errors */}
          {/* {(validationError || mutation.error) && (
            <p className="font-bold text-[#832035] text-md">
              {validationError
                ? validationError
                : mutation.error?.message === 'Failed to fetch'
                  ? 'Failed to update log'
                  : mutation.error?.message}
            </p>
          )} */}

          {viewMode === 'Saved recipients' ? (
            <div className="h-80">
              <p className="mb-6 text-xl">My bank accounts</p>
              {bankAccounts.map((account) => {
                const isDisabled =
                  fromAccount?.accountNumber === account.accountNumber

                return (
                  <div>
                    <button
                      key={account.accountNumber}
                      type="button"
                      onClick={() => {
                        if (isDisabled) return
                        setToAccount(account)
                        onSubmit(account)
                        dialogRef.current?.close()
                        onClose()
                      }}
                      className={`block w-full text-left p-3 rounded 
                    ${
                      isDisabled
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-gray-100 hover:cursor-pointer'
                    }`}
                      disabled={isDisabled}
                    >
                      {account.accountName}
                    </button>
                    {isDisabled && (
                      <span className="text-xs text-red-500">
                        (Already selected as from account)
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="h-80">
              {/* New account */}
              <div className="relative w-full">
                <input
                  id="newAccount"
                  type="text"
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className={`peer hover:cursor-pointer border border-gray-500 text-black rounded 
                        p-4 w-full text-left focus:ring-1 focus:ring-black bg-white
                        `}
                />

                <label
                  htmlFor="newAccount"
                  className={`absolute hover:cursor-pointer left-4 px-1  transition-all duration-200 bg-white
                        ${
                          newRecipient
                            ? '-top-2.5 text-sm text-black'
                            : 'top-4 text-base text-gray-400 bg-transparent'
                        }
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black 
                        peer-focus:bg-white`}
                >
                  Account number
                </label>
              </div>
              {/* Done button */}
              <div className="flex flex-col sm:flex-row justify-end sm:gap-4 gap-2 mt-4">
                <button
                  type="submit"
                  //   disabled={mutation.isPending}
                  className="bg-[#FFB20F] mt-5 hover:bg-[#F5A700] text-black font-semibold shadow-sm px-5 py-2 rounded 
                             hover:cursor-pointer transition-colors w-full"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </dialog>
  )
}
