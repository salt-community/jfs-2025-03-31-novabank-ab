import { useTranslation } from 'react-i18next'
import { useAccounts } from '@/hooks'
import type { Account } from '@/types'
import Spinner from '../generic/Spinner'

type SenderProps = {
  sender: Account | null
  setSender: React.Dispatch<React.SetStateAction<Account | null>>
  recipient: Account | null
  error: string | undefined
}

export default function Sender({
  sender,
  setSender,
  recipient,
  error,
}: SenderProps) {
  const { t } = useTranslation('accounts')
  const { data: bankAccounts = [], isLoading, isError } = useAccounts()

  if (isLoading) return <Spinner />

  if (isError)
    return <div className="p-8 text-red-500">{t('failedToLoadAccounts')}</div>

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <select
          id="fromAccount"
          name="bankaccounts"
          value={sender?.accountNumber || ''}
          onChange={(e) => {
            const selectedAccount = bankAccounts.find(
              (acc) => acc.accountNumber === e.target.value,
            )
            setSender(selectedAccount || null)
          }}
          className={`appearance-none peer hover:cursor-pointer rounded-md shadow-md p-4 pr-10 w-full outline outline-gray-200 focus:outline-2 focus:outline-black bg-white text-left
            ${error ? 'outline-red-600 focus:outline-red-600' : ''}
            ${sender ? 'text-black' : 'text-gray-400'}`}
        >
          <option value="" className="text-gray-400">
            {t('selectAnAccount')}
          </option>
          {bankAccounts.map((account) => {
            const isDisabled =
              recipient?.accountNumber === account.accountNumber

            return (
              <option
                key={account.accountNumber}
                value={account.accountNumber}
                disabled={isDisabled}
                className={`text-black ${
                  isDisabled ? 'bg-gray-100 text-gray-400' : ''
                }`}
              >
                {account.type} - {account.accountNumber}
                {isDisabled ? ` (${t('alreadySelectedAsRecipient')})` : ''}
              </option>
            )
          })}
        </select>

        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <svg
            className="w-5 h-5"
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
        </div>

        {/* Floating label */}
        <label
          htmlFor="fromAccount"
          className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none rounded-lg
            ${
              sender
                ? '-top-2.5 font-semibold text-sm text-black'
                : 'top-4 text-base text-gray-400 bg-transparent pr-20'
            }
            ${error ? 'peer-focus:text-red-600' : 'peer-focus:text-black'}
            peer-focus:-top-2.5 peer-focus:px-1 peer-focus:font-semibold peer-focus:text-sm peer-focus:bg-white`}
        >
          {t('sender')}
        </label>
      </div>

      {/* Error message */}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  )
}
