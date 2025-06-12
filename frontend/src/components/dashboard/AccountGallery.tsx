import { Link } from '@tanstack/react-router'
import AccountCard from './AccountCard'
import type { Account } from '@/types'

type AccountGalleryProps = {
  bankAccounts: Array<Account>
}

export default function AccountGallery({ bankAccounts }: AccountGalleryProps) {
  return (
    <div
      className="flex flex-col items-center p-10 gap-10"
      data-testid="account-gallery"
    >
      <div>
        <h1 className="text-center font-semibold text-xl mb-4">
          My Accounts ({bankAccounts.length})
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {bankAccounts.map((account) => (
            <div key={account.number}>
              <Link to="/accounts/$id" params={{ id: account.number }}>
                <AccountCard account={account} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
