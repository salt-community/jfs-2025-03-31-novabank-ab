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
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl">My bank accounts ({bankAccounts.length})</h1>
      <div className="space-y-3">
        {bankAccounts.map((account) => (
          <div
            key={account.accountNumber}
            className="flex items-center justify-between border px-4 py-3 shadow-sm hover:bg-gray-200"
          >
            <div>
              <div>{account.accountName}</div>
              <div className="text-sm text-gray-500">
                {account.accountNumber}
              </div>
            </div>
            <div className="text-right ">
              $
              {account.balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
              <span className="ml-2">{'>'}</span>
            </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-between bg-amber-400 hover:bg-amber-500 py-3 px-4 shadow">
          <span className="text-lg">+ Open new account</span>
          <span className="text-xl">{'>'}</span>
        </button>
      </div>
    </div>
  )
}
