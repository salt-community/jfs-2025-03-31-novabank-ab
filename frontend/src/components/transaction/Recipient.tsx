import { useTranslation } from 'react-i18next'
import type { Account } from '@/types'
import { useState } from 'react'
import RecipientsModal from './RecipientsModal'
import { useAccounts } from '@/hooks'

type RecipientProps = {
  sender: Account | null
  error: string | undefined
  recipientAccount: Account | null
  setRecipientAccount: React.Dispatch<React.SetStateAction<Account | null>>
  recipientClient: string | null
  setRecipientClient: React.Dispatch<React.SetStateAction<string | null>>
  setAccNoType: React.Dispatch<React.SetStateAction<string>>
}

export default function Recipient({
  sender,
  error,
  recipientAccount,
  setRecipientAccount,
  recipientClient,
  setRecipientClient,
  setAccNoType,
}: RecipientProps) {
  const { t } = useTranslation('accounts')
  const { data: bankAccounts = [], isError } = useAccounts()
  const [showRecipientsModal, setShowRecipientsModal] = useState(false)

  const handleClearRecipient = () => {
    setRecipientClient(null)
    setRecipientAccount(null)
  }

  const handleAccount = (
    account: Account | null | string,
    accountNumberType: string,
  ) => {
    if (typeof account === 'string') {
      setRecipientClient(account)
      setAccNoType(accountNumberType)
      setRecipientAccount(null) // clear previous selection
    } else {
      setRecipientAccount(account)
      setAccNoType(accountNumberType)
      setRecipientClient(null) // clear new recipient string
    }
  }

  if (isError)
    return <div className="p-8 text-red-500">{t('failedToLoadAccounts')}</div>

  return (
    <>
      {/* Recipient */}
      <div className="relative w-full">
        <button
          id="toAccount"
          type="button"
          onClick={() => setShowRecipientsModal(true)}
          className={`peer hover:cursor-pointer rounded-md shadow-md p-4 w-full text-left outline outline-gray-200 focus:outline-2 focus:outline-black bg-white
                      ${recipientAccount || recipientClient ? 'text-black' : 'text-gray-400'}
                      ${error ? 'outline-none border border-red-600 focus:ring-red-600 focus:border-2 ' : ''}`}
        >
          {recipientAccount
            ? `${recipientAccount.type} - ${recipientAccount.accountNumber}`
            : recipientClient
              ? recipientClient
              : 'Select an account'}
        </button>

        <label
          htmlFor="toAccount"
          className={`absolute hover:cursor-pointer left-4 px-1 transition-all duration-200 bg-white
                      ${
                        recipientAccount || recipientClient
                          ? '-top-2.5 font-semibold text-sm text-black'
                          : 'top-4 text-base text-gray-400 bg-transparent pr-15'
                      }
                      ${error ? ' peer-focus:text-red-600 ' : 'peer-focus:text-black'}
                      
                      peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm  
                      peer-focus:bg-white`}
        >
          {t('recipient')}
        </label>
        {(recipientAccount || recipientClient) && (
          <button
            onClick={handleClearRecipient}
            type="button"
            aria-label="Clear recipient"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
          >
            &#10005;
          </button>
        )}
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
      {/* Recipients modal */}
      {showRecipientsModal && (
        <RecipientsModal
          bankAccounts={bankAccounts}
          sender={sender}
          onSubmit={handleAccount}
          onClose={() => {
            setShowRecipientsModal(false)
          }}
          setAccNoType={setAccNoType}
          setRecipientAccount={setRecipientAccount}
          recipientClient={recipientClient}
          setRecipientClient={setRecipientClient}
        />
      )}
    </>
  )
}
