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
    <div className="flex flex-col items-center p-10 gap-10">
      <div>
        <h1 className="text-center font-semibold text-xl mb-4">
          My Accounts ({bankAccounts.length})
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {bankAccounts.map((account) => (
            <div key={account.accountNumber}>
              <Link to="/account/$id" params={{ id: account.accountNumber }}>
                <AccountCard account={account} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
