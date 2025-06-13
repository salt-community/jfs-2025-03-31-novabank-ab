import type { Account } from '@/types'

type AccountCardProps = {
  account: Account
}

const test = 'hello'

export default function AccountCard({ account }: AccountCardProps) {
  return (
    <>
      <div
        className="w-40 p-4 border rounded-lg text-center"
        data-testid="account-card"
      >
        <h1 data-testid="account-name">{account.name}</h1>
        <p data-testid="account-number">{account.number}</p>
        <h4 data-testid="account-balance">{account.balance} SEK</h4>
        <p>Total balance</p>
      </div>
    </>
  )
}
