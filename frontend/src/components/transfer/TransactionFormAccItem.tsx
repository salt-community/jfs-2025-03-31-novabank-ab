import type { Account } from '@/types'
import { useTranslation } from 'react-i18next'

type TransactionFormAccItem = {
  account: Account
  isDisabled: boolean
}

export default function TransactionFormAccItem({
  account,
  isDisabled,
}: TransactionFormAccItem) {
  const { t } = useTranslation('transactionDetails')
  return (
    <div
      className={`border-1 flex items-center justify-between px-4 py-3 shadow-md bg-white duration-200
        ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-[#FAFAFA] cursor-pointer'}
        rounded-lg w-full`}
    >
      {/* Left: account info */}
      <div className="flex flex-col text-left">
        <div className="text-base">{account.type}</div>
        <div className="text-sm text-gray-500">{account.accountNumber}</div>
      </div>

      {/* Right: balance and optional message */}
      <div className="flex flex-col items-end text-right min-w-fit ml-4">
        <div className="text-base">
          {account.balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}{' '}
          {account.currency}
        </div>

        {isDisabled && (
          <div className="text-xs text-red-500 sm:inline-block">
            ({t('selectedAsSender')})
          </div>
        )}
      </div>
    </div>
  )
}
