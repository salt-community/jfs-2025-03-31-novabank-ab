import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import TransactionFormAccItem from './TransactionFormAccItem'
import type { Account } from '@/types'

type RecipientsModalProps = {
  bankAccounts: Array<Account>
  sender: Account | null
  onSubmit: (recipient: Account | null | string, accNoType: string) => void
  onClose: () => void
  setAccNoType: React.Dispatch<React.SetStateAction<string>>
  setRecipientAccount: React.Dispatch<React.SetStateAction<Account | null>>
  recipientClient: string | null
  setRecipientClient: React.Dispatch<React.SetStateAction<string | null>>
}

export default function RecipientsModal({
  bankAccounts,
  sender,
  onSubmit,
  onClose,
  setAccNoType,
  setRecipientAccount,
  recipientClient,
  setRecipientClient,
}: RecipientsModalProps) {
  const { t } = useTranslation('accounts')
  const savedRecipients = t('savedRecipients')
  const [viewMode, setViewMode] = useState<string>(savedRecipients)

  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [newRec, setNewRec] = useState<string | null>('')
  const [ant, setAnt] = useState('')

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

  function normalizeInput(input: string): string {
    return input
      .replace(/[\uFF10-\uFF19]/g, (d) =>
        String.fromCharCode(d.charCodeAt(0) - 0xff10 + 48),
      )
      .replace(/\uFF0D/g, '-') // Full-width hyphen to ASCII hyphen
      .normalize('NFKC') // Unicode normalization form
  }

  function isValidAccountNumber(type: string, value: string): boolean {
    const asciiValue = normalizeInput(value)

    // Reject if contains spaces anywhere
    if (/\s/.test(asciiValue)) return false

    const hasHyphen = asciiValue.includes('-')
    const cleaned = asciiValue.replace(/-/g, '')
    const upper = cleaned.toUpperCase()

    switch (type) {
      case 'Plusgiro':
        if (hasHyphen) {
          return /^\d{2,7}-\d{1}$/.test(asciiValue)
        } else {
          return /^\d{2,8}$/.test(cleaned)
        }

      case 'Bankgiro':
        if (hasHyphen) {
          return /^\d{3,4}-\d{4}$/.test(asciiValue)
        } else {
          return /^\d{7,8}$/.test(cleaned)
        }

      case t('otherAccount'): {
        if (hasHyphen) return false

        const isPlainNumber = /^\d{4,30}$/.test(cleaned)
        const isSwedishIBAN = /^SE\d{10}$/.test(upper) // SE + 10 digits

        return isPlainNumber || isSwedishIBAN
      }

      default:
        return false
    }
  }

  function isFormValid(): boolean {
    const newErrors: typeof errors = {}

    if (!ant) {
      newErrors.accNoTypeError = t('pleaseSelectAnAccountNumberType')
    }

    if (!newRec || newRec.trim() === '') {
      newErrors.recipientError = t('accountNumberIsRequired')
    } else if (!isValidAccountNumber(ant, newRec.trim())) {
      newErrors.recipientError = `${t('invalid')} ${ant} ${t('number')}`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRecipientSubmit = (account: Account | string | null) => {
    if (viewMode === t('newRecipient')) {
      if (!isFormValid()) return
      const trimmed = newRec?.trim().toUpperCase() || ''
      setRecipientClient(trimmed)
      setAccNoType(ant)
      onSubmit(trimmed, ant)
    } else if (typeof account === 'object') {
      setRecipientAccount(account)
      onSubmit(account, t('otherAccount'))
    }

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
        className="modal-box max-h-[90vh] bg-white rounded-lg shadow-lg relative px-6 py-8 max-w-3xl 
                      sm:max-w-xl text-[#141414]"
      >
        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl cursor-pointer"
          aria-label={t('close')}
        >
          &times;
        </button>

        <div className="flex text-sm mt-5 bg-gray-100 w-70 mx-auto rounded-md">
          <button
            type="button"
            className={`w-35 duration-200 px-3 py-1 rounded-l-md ${
              viewMode === `${t('savedRecipients')}`
                ? 'bg-gray-200 pointer-events-none'
                : 'bg-transparent hover:cursor-pointer shadow-sm'
            }`}
            onClick={() => {
              setViewMode(`${t('savedRecipients')}`)
            }}
          >
            {t('savedRecipients')}
          </button>

          <button
            type="button"
            className={`w-35 duration-200 px-3 py-1 rounded-r-md ${
              viewMode === t('newRecipient')
                ? 'bg-gray-200 pointer-events-none'
                : 'bg-transparent hover:cursor-pointer shadow-sm'
            }`}
            onClick={() => {
              setViewMode(t('newRecipient'))
            }}
          >
            {t('newRecipient')}
          </button>
        </div>

        <div className="space-y-2 p-10">
          {viewMode === `${t('savedRecipients')}` ? (
            <div className="h-80">
              <p className="mb-4 text-xl">{t('myBankAccounts')}</p>
              {bankAccounts.map((account) => {
                const isDisabled =
                  sender?.accountNumber === account.accountNumber

                return (
                  <button
                    key={account.accountNumber}
                    type="submit"
                    onClick={() => {
                      if (isDisabled) return
                      setAccNoType(t('otherAccount'))
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
                    <TransactionFormAccItem
                      key={account.accountNumber}
                      account={account}
                      isDisabled={isDisabled}
                    />
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="h-80 space-y-5">
              {/* New account */}
              <div className="relative w-full">
                <input
                  id="newAccount"
                  value={newRec || ''}
                  type="text"
                  onChange={(e) => setNewRec(e.target.value)}
                  className={`peer hover:cursor-pointer  text-black rounded-md shadow-md
                        p-4 w-full text-left  bg-white outline focus:outline-2
                        ${errors.recipientError ? ' outline-red-600 focus:outline-red-600  ' : ' outline-gray-200 focus:outline-black'}
                        `}
                />

                <label
                  htmlFor="newAccount"
                  className={`absolute hover:cursor-pointer left-4 px-1  transition-all duration-200 bg-white rounded-lg
                        ${
                          newRec
                            ? '-top-2.5 text-sm text-black font-semibold'
                            : 'top-4 text-base text-gray-400 bg-transparent'
                        }
                        ${errors.recipientError ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-semibold
                        peer-focus:bg-white`}
                >
                  {t('accountNumber')}
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
                  value={ant || ''}
                  onChange={(e) => setAnt(e.target.value)}
                  className={`peer hover:cursor-pointer rounded-md shadow-md p-4 pb-5 w-full outline outline-gray-200 
                              focus:outline-2 focus:outline-black text-left bg-white
                              ${errors.accNoTypeError ? 'outline outline-red-600 focus:outline-red-600 ' : ''}
                              border-r-15 border-transparent
                              ${ant ? ' text-black' : 'text-gray-400'}`}
                >
                  <option value="" className="text-gray-400">
                    {t('selectAnAccountNumberType')}
                  </option>
                  <option className="text-black" value="Plusgiro">
                    Plusgiro
                  </option>
                  <option className="text-black" value="Bankgiro">
                    Bankgiro
                  </option>
                  <option className="text-black" value="Other account">
                    {t('otherAccount')}
                  </option>
                </select>

                <label
                  htmlFor="accNoType"
                  className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none rounded-lg
              ${
                ant
                  ? '-top-2.5 font-semibold text-sm text-black'
                  : 'top-4 text-base text-gray-400 bg-transparent pr-20'
              }
              ${errors.accNoTypeError ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
              peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
              peer-focus:bg-white `}
                >
                  {t('Account number type')}
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
                  onClick={() => {
                    handleRecipientSubmit(recipientClient)
                  }}
                  className="bg-[#FFB20F] hover:bg-[#F5A700] hover:cursor-pointer w-full text-black shadow-md px-5 py-2 rounded-md transition-colors"
                >
                  {t('done')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  )
}
