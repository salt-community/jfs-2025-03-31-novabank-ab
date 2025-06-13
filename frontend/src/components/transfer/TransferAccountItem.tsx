import type { Account } from '@/types'

type TransferAccountItemProps = {
  account: Account
  isDisabled: boolean
}

export default function TransferAccountItem({
  account,
  isDisabled,
}: TransferAccountItemProps) {
  return (
    <div className={`flex items-center justify-between border px-4 py-2 shadow-sm 
                      ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-100  cursor-pointer'}
                      rounded-md`}>
      <div>
        <div>{account.name}</div>
        <div className="text-sm text-gray-500">{account.number}</div>
      </div>

      {isDisabled && (
        <span className="text-xs text-red-500">
          (Already selected as sender)
        </span>
      )}

      <div className="text-right">
        $
        {account.balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </div>

    </div>
  )
}
