import { Link } from '@tanstack/react-router'
import AccountCard from './AccountCard'
import type { Account } from '@/types'
import { useTranslation } from 'react-i18next'

type AccountGalleryProps = {
  bankAccounts: Array<Account>
}

export function AccountGallery({ bankAccounts }: AccountGalleryProps) {
  const { t } = useTranslation('accounts')
  return (
    <div data-testid="account-gallery">
      <div className="">
        <h1 className="text-2xl mb-5">{t('myBankAccounts')}</h1>

        <div className="flex gap-6">
          {bankAccounts.map((account) => (
            <div key={account.id}>
              <Link to="/accounts/$id" params={{ id: account.id }}>
                <AccountCard account={account} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
