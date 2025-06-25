import { useAccounts } from '@/hooks'
import { useTranslation } from 'react-i18next'
import type { Account } from '@/types'
import Spinner from '../generic/Spinner'

type AccountFilterProps = {
  selectedAccount: Account | null
  setSelectedAccount: (account: Account | null) => void
}

export default function AccountFilterDropdown({
  selectedAccount,
  setSelectedAccount,
}: AccountFilterProps) {
  const { t } = useTranslation('accounts')
  const { data: bankAccounts = [], isLoading, isError } = useAccounts()

  if (isLoading) return <Spinner />
  if (isError)
    return <div className="p-4 text-red-500">{t('failedToLoadAccounts')}</div>

  return (
    <div className="w-40 ">
      <select
        id="accountFilter"
        value={selectedAccount?.accountNumber || ''}
        onChange={(e) => {
          const selected = bankAccounts.find(
            (acc) => acc.accountNumber === e.target.value,
          )
          setSelectedAccount(selected || null)
        }}
        className={`
          border-r-10 border-transparent outline outline-black cursor-pointer rounded-4xl px-2 w-full  
          text-left bg-white h-8
        `}
      >
        <option value="" className="text-gray-400 text-sm">
          {t('allAccounts')}
        </option>
        {bankAccounts.map((account) => (
          <option
            key={account.accountNumber}
            value={account.accountNumber}
            className="text-black"
          >
            {account.type} - {account.accountNumber}
          </option>
        ))}
      </select>

      <label
        htmlFor="accountFilter"
        className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none rounded-lg
          peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:text-sm 
          peer-focus:text-black peer-focus:px-1 peer-focus:bg-white
        `}
      >
      </label>
    </div>
  )
}
