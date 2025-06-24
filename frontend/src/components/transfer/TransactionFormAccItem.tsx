import type { Account } from '@/types'

type TransactionFormAccItem = {
  account: Account
  isDisabled: boolean
}

export default function TransactionFormAccItem({
  account,
  isDisabled,
}: TransactionFormAccItem) {
  return (
    <div
      className={` border-1 flex items-center justify-between px-4 py-3 shadow-md bg-white duration-200
                      ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-[#FAFAFA]  cursor-pointer'}
                      rounded-lg`}
    >
      <div>
        <div className='text-left'>{account.type}</div>
        <div className="text-left text-sm text-gray-500">
          {account.accountNumber}
        </div>
      </div>
      {isDisabled && (
        <span className="text-xs text-red-500">
          (Already selected as sender)
        </span>
      )}

      <div className="text-right">
        {account.balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </div>
    </div>
  )
}
