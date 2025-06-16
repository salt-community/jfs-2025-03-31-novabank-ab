import { Link } from '@tanstack/react-router'
import AccountCard from './AccountCard'
import type { Account } from '@/types'

type AccountGalleryProps = {
  bankAccounts: Array<Account>
}

export function AccountGallery({ bankAccounts }: AccountGalleryProps) {
  return (
    <div data-testid="account-gallery">
      <div className=''>
        <h1 className="text-2xl mb-5">My bank accounts</h1>

        <div className="flex gap-6">
          {bankAccounts.map((account) => (
            <div key={account.accountNumber}>
              <Link to="/accounts/$id" params={{ id: account.accountNumber }}>
                <AccountCard account={account} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
