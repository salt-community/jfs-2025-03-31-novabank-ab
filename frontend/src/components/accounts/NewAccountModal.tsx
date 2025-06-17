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

  const handleContinue = () => {
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
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-w-md bg-white rounded-lg shadow-lg px-6 py-8 text-[#141414] font-old relative">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-6">Create New Bank Account</h2>

        <div className="space-y-5">
          {/* Account Type */}
          <div className="relative w-full">
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as AccountType)}
              className={`peer w-full p-4 rounded bg-white outline ${
                errors.accountType ? 'outline-red-600' : 'outline-gray-500'
              } focus:outline-2 focus:outline-black text-left`}
            >
              <option value="" className="text-gray-400">
                Select account type
              </option>
              <option value="SAVINGS">Savings</option>
              <option value="PERSONAL">Personal</option>
            </select>
            <label className="absolute left-4 px-1 -top-2.5 text-sm text-black bg-white transition-all">
              Account Type
            </label>
            {errors.accountType && (
              <p className="text-red-600 text-sm mt-1">{errors.accountType}</p>
            )}
          </div>

          {/* Currency */}
          <div className="relative w-full">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className={`peer w-full p-4 rounded bg-white outline ${
                errors.currency ? 'outline-red-600' : 'outline-gray-500'
              } focus:outline-2 focus:outline-black text-left`}
            >
              <option value="" className="text-gray-400">
                Select currency
              </option>
              <option value="SEK">SEK</option>
              <option value="EUR">EUR</option>
            </select>
            <label className="absolute left-4 px-1 -top-2.5 text-sm text-black bg-white transition-all">
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
              onClick={handleContinue}
              className="w-full px-5 py-2 bg-[#FFB20F] hover:bg-[#F5A700] text-black font-semibold shadow-sm rounded transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
