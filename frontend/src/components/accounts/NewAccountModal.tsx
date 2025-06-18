import { useEffect, useRef, useState } from 'react'

type AccountType = 'SAVINGS' | 'PERSONAL'
type Currency = 'SEK' | 'EUR'

type NewAccountModalProps = {
  onSubmit: (type: AccountType, currency: Currency) => void
  onClose: () => void
}

export default function NewAccountModal({
  onSubmit,
  onClose,
}: NewAccountModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const [accountType, setAccountType] = useState<AccountType | ''>('')
  const [currency, setCurrency] = useState<Currency | ''>('')
  const [errors, setErrors] = useState<{
    accountType?: string
    currency?: string
  }>({})

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const handleCancel = () => {
    dialogRef.current?.close()
    onClose()
  }

  const handleSubmit = () => {
    const newErrors: typeof errors = {}

    if (!accountType) newErrors.accountType = 'Please select an account type'
    if (!currency) newErrors.currency = 'Please select a currency'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onSubmit(accountType as AccountType, currency as Currency)
    dialogRef.current?.close()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          handleCancel()
        }
      }}
    >
      <div
        className="modal-box max-h-[90vh] bg-white p-10 rounded-lg shadow-lg relative  max-w-3xl 
                      sm:max-w-xl text-[#141414]"
      >
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="space-y-5 p-8 h-100">
          <p className="mb-10 text-center text-xl">Open new account</p>
          {/* Account Type */}
          <div className="relative w-full">
            <select
              value={accountType}
              id="accountType"
              onChange={(e) => setAccountType(e.target.value as AccountType)}
              className={`peer hover:cursor-pointer rounded-md shadow-md p-4 pb-5 w-full outline outline-gray-200 
                              focus:outline-2 focus:outline-black text-left bg-white
                              ${errors.accountType ? 'outline outline-red-600 focus:outline-red-600 ' : ''}
                              border-r-15 border-transparent
                              ${accountType ? ' text-black' : 'text-gray-400'}`}
            >
              <option value="" className="text-gray-400">
                Select an account type
              </option>
              <option className="text-black" value="SAVINGS">
                Savings
              </option>
              <option className="text-black" value="PERSONAL">
                Personal
              </option>
            </select>
            <label
              htmlFor="accountType"
              className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none
              ${
                accountType
                  ? '-top-2.5 font-semibold text-sm text-black'
                  : 'top-4 text-base text-gray-400 bg-transparent pr-20'
              }
              ${errors.accountType ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
              peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
              peer-focus:bg-white `}
            >
              Account type
            </label>
            {errors.accountType && (
              <p className="text-red-600 text-sm mt-1">{errors.accountType}</p>
            )}
          </div>

          {/* Currency */}
          <div className="relative w-full">
            <select
              value={currency}
              id="currency"
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className={`peer hover:cursor-pointer rounded-md shadow-md p-4 pb-5 w-full outline outline-gray-200 
                              focus:outline-2 focus:outline-black text-left bg-white
                              ${errors.currency ? 'outline outline-red-600 focus:outline-red-600 ' : ''}
                              border-r-15 border-transparent
                              ${currency ? ' text-black' : 'text-gray-400'}`}
            >
              <option value="" className="text-gray-400">
                Select currency
              </option>
              <option className="text-black" value="SEK">
                SEK
              </option>
              <option className="text-black" value="EUR">
                EUR
              </option>
            </select>
            <label
              htmlFor="currency"
              className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none
              ${
                currency
                  ? '-top-2.5 font-semibold text-sm text-black'
                  : 'top-4 text-base text-gray-400 bg-transparent pr-20'
              }
              ${errors.currency ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
              peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
              peer-focus:bg-white `}
            >
              Currency
            </label>
            {errors.currency && (
              <p className="text-red-600 text-sm mt-1">{errors.currency}</p>
            )}
          </div>

          {/* Continue Button */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#FFB20F] hover:bg-[#F5A700] hover:cursor-pointer w-full text-black shadow-md px-5 py-2 rounded-md transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
