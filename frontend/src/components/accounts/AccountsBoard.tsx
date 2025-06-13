import AccountItem from './AccountItem'

const bankAccounts = [
  {
    accountName: 'Savings',
    accountNumber: '**** 2201',
    balance: 4465.23,
  },
  {
    accountName: 'Personal',
    accountNumber: '**** 7654',
    balance: 532.78,
  },
  {
    accountName: 'Family',
    accountNumber: '**** 4720',
    balance: 66004.65,
  },
]
export default function AccountsBoard() {
  return (
    <div className="max-w mx-auto p-6 space-y-6">
      <h1 className="text-2xl">My bank accounts ({bankAccounts.length})</h1>
      <div className="space-y-3">
        {bankAccounts.map((account) => (
          <AccountItem
            key={account.accountNumber}
            account={account}
          />
        ))}

        <button className="w-full flex items-center justify-between bg-amber-400 hover:bg-amber-500 py-3 px-4 shadow rounded-md">
          <span className="text-lg">+ Open new account</span>
          <span className="text-xl">{'>'}</span>
        </button>
      </div>
    </div>
  )
}
