import AccountItem from './AccountItem'

type Account = {
  accountName: string
  accountNumber: string
  balance: number
}

type AccountsBoardProps = {
  accounts: Array<Account>
}

export default function AccountsBoard({ accounts }: AccountsBoardProps) {
  return (
    <div className="max-w mx-auto p-6 space-y-6">
      <h1 className="text-2xl">My bank accounts ({accounts.length})</h1>
      <div className="space-y-3">
        {accounts.map((account) => (
          <AccountItem key={account.accountNumber} account={account} />
        ))}

        <button className="w-full flex items-center justify-between bg-amber-400 hover:bg-amber-500 py-3 px-4 shadow rounded-md">
          <span className="text-lg">+ Open new account</span>
          <span className="text-xl">{'>'}</span>
        </button>
      </div>
    </div>
  )
}
