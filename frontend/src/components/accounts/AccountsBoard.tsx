import AccountItem from './AccountItem'

const bankAccounts = [
  {
    name: 'Savings',
    number: '**** 2201',
    balance: 4465.23,
  },
  {
    name: 'Personal',
    number: '**** 7654',
    balance: 532.78,
  },
  {
    name: 'Family',
    number: '**** 4720',
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
            key={account.number}
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
