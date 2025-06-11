type Account = {
  accountName: string
  accountNumber: string
  balance: number
}

type AccountCardProps = {
  account: Account
}

export default function AccountCard({ account }: AccountCardProps) {
  return (
    <>
      <div
        className="w-40 p-4 border rounded-lg text-center"
        data-testid="account-card"
      >
        <h1 data-testid="account-name">{account.accountName}</h1>
        <p data-testid="account-number">{account.accountNumber}</p>
        <h4>{account.balance} SEK</h4>
        <p>Total balance</p>
      </div>
    </>
  )
}
