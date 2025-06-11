import { Link } from '@tanstack/react-router'
import AccountCard from './AccountCard'

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

export default function AccountGallery() {
  return (
    <div>
      <h1 className="text-center">My Accounts ({bankAccounts.length})</h1>

      <div className="flex flex-row items-center gap-6">
        {bankAccounts.map((account) => (
          <div key={account.accountNumber}>
            <Link to="/account/$id" params={{ id: account.accountNumber }}>
              <AccountCard account={account} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
