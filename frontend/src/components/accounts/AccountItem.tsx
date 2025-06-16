import { useNavigate } from '@tanstack/react-router'
import rightarrowicon from '../../assets/rightarrowicon.svg'
import type { Account } from '@/types'

type AccountItemProps = {
  account: Account
}

export default function   AccountItem({ account }: AccountItemProps) {
  const navigate = useNavigate()

  return (
    <div
      data-testid="account-item"
      className="group flex items-center border-1 justify-between px-4 py-3 shadow-md bg-white hover:bg-[#FAFAFA] duration-200 rounded-lg cursor-pointer"
      onClick={() =>
        navigate({
          to: '/accounts/$id',
          params: { id: account.number },
        })
      }
    >
      <div>
        <div>{account.name}</div>
        <div className="text-sm text-gray-500">{account.number}</div>
      </div>

      <div className="flex items-center space-x-2">
        <span>
          $
          {account.balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>

        <img
          src={rightarrowicon}
          alt=""
          className="opacity-0 text-gray-300 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    </div>
  )
}
