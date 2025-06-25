import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('accounts')
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

    if (!accountType) newErrors.accountType = t('selectAccountType')
    if (!currency) newErrors.currency = t('selectCurrency')

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onSubmit(accountType as AccountType, currency as Currency)
    dialogRef.current?.close()
    onClose()
  }

  const ArrowIcon = (
    <svg
      className="w-5 h-5 text-gray-500 pointer-events-none"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )

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
        className="
          modal-box
          max-h-[90vh] 
          bg-white 
          p-6 sm:p-10 
          rounded-lg 
          shadow-lg 
          relative  
          max-w-full sm:max-w-xl 
          text-[#141414] 
          overflow-auto
          "
      >
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-3xl sm:text-2xl cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="space-y-5 p-2 sm:p-8 h-full">
          <p className="mb-6 sm:mb-10 text-center text-lg sm:text-xl ">
            {t('openNewAccount')}
          </p>

          {/* Account Type */}
          <div className="w-full">
            <div className="relative flex items-center">
              <select
                value={accountType}
                id="accountType"
                onChange={(e) => setAccountType(e.target.value as AccountType)}
                className={`appearance-none peer hover:cursor-pointer rounded-md border-r-10 border-transparent shadow-md p-4 pr-10 w-full outline outline-gray-200 
                            focus:outline-2 focus:outline-black text-left bg-white
                            ${errors.accountType ? 'outline-red-600 focus:outline-red-600' : ''}
                            ${accountType ? 'text-black' : 'text-gray-400'}`}
              >
                <option value="" className="text-gray-400">
                  {t('selectAnAccountType')}
                </option>
                <option className="text-black" value="SAVINGS">
                  {t('savings')}
                </option>
                <option className="text-black" value="PERSONAL">
                  {t('personal')}
                </option>
              </select>

              {/* Arrow absolutely positioned to the right inside flex container */}
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                {ArrowIcon}
              </div>

              <label
                htmlFor="accountType"
                className={`absolute left-3 px-1 transition-all duration-200 bg-white pointer-events-none
                ${
                  accountType
                    ? '-top-2.5 font-semibold text-sm text-black'
                    : 'top-3.5 text-base text-gray-400 bg-transparent pr-16'
                }
                ${errors.accountType ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
                peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
                peer-focus:bg-white `}
              >
                {t('accountType')}
              </label>
            </div>
            {errors.accountType && (
              <p className="text-red-600 text-sm mt-1">{errors.accountType}</p>
            )}
          </div>

          {/* Currency */}
          <div className="w-full">
            <div className="relative flex items-center">
              <select
                value={currency}
                id="currency"
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className={`appearance-none peer hover:cursor-pointer border-r-10 border-transparent rounded-md shadow-md p-4 pr-10 w-full outline outline-gray-200 
                            focus:outline-2 focus:outline-black text-left bg-white
                            ${errors.currency ? 'outline-red-600 focus:outline-red-600' : ''}
                            ${currency ? 'text-black' : 'text-gray-400'}`}
              >
                <option value="" className="text-gray-400">
                  {t('selectCurrencyOnly')}
                </option>
                <option className="text-black" value="SEK">
                  {t('sek')}
                </option>
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                {ArrowIcon}
              </div>

              <label
                htmlFor="currency"
                className={`absolute left-3 px-1 transition-all duration-200 bg-white pointer-events-none
                ${
                  currency
                    ? '-top-2.5 font-semibold text-sm text-black'
                    : 'top-3.5 text-base text-gray-400 bg-transparent pr-16'
                }
                ${errors.currency ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
                peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
                peer-focus:bg-white `}
              >
                {t('currency')}
              </label>
            </div>
            {errors.currency && (
              <p className="text-red-600 text-sm mt-1">{errors.currency}</p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#FFB20F] hover:bg-[#F5A700] hover:cursor-pointer w-full text-black shadow-md py-2 px-3 rounded-md transition-colors text-base"
            >
              {t('done')}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
