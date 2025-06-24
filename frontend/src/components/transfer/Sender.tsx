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
    <>
      {/* Sender */}
      <div className="relative w-full">
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
          className={` shadow-md peer hover:cursor-pointer rounded-md p-4 w-full outline outline-gray-200 focus:outline-2 focus:outline-black text-left bg-white
             ${error ? 'outline outline-red-600 focus:outline-red-600 ' : ''}
              border-r-15 border-transparent 
              ${sender ? ' text-black' : 'text-gray-400'}`}
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
                  isDisabled ? 'bg-gray-200 text-gray-400' : ''
                }`}
              >
                {account.type} - {account.accountNumber}
                {isDisabled ? ' (Already selected as recipient)' : ''}
              </option>
            )
          })}
        </select>

        <label
          htmlFor="fromAccount"
          className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none rounded-lg
              ${
                sender
                  ? '-top-2.5 font-semibold text-sm text-black'
                  : 'top-4 text-base text-gray-400 bg-transparent pr-20'
              }
              ${error ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
              peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
              peer-focus:bg-white `}
        >
          {t('sender')}
        </label>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    </>
  )
}
