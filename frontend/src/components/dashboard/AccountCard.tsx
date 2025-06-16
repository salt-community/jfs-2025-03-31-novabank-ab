import type { Account } from '@/types'

type AccountCardProps = {
  account: Account
}

export default function AccountCard({ account }: AccountCardProps) {
  return (
    <>
      <div
        className="flex flex-col justify-evenly w-50 h-50 p-4 rounded-4xl text-center shadow-lg bg-[#FFFFFF]  hover:bg-[#FAFAFA] duration-200 "
        data-testid="account-card"
      >
        <div>
          <h1 className="text-lg" data-testid="account-name">
            {account.type}
          </h1>
          <p className="text-xs text-gray-500" data-testid="account-number">
            {account.accountNumber}
          </p>
        </div>
        <div>
          <h4 className="text-xl font-semibold" data-testid="account-balance">
            {account.balance} SEK
          </h4>
          <p className="text-xs text-gray-500">total balance</p>
        </div>
      </div>
    </>
  )
}
