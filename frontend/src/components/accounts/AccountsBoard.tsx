

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
export default function AccountsBoard(){
    return (<>
    <h1 className="text-5xl text-center"> My Accounts ({bankAccounts.length})</h1>
    </>)
}