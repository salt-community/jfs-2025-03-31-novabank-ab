import { Link, useNavigate } from '@tanstack/react-router'
import AccountCard from './AccountCard'
import type { Account } from '@/types'
import { useTranslation } from 'react-i18next'

type AccountGalleryProps = {
  bankAccounts: Array<Account>
}

export function AccountGallery({ bankAccounts }: AccountGalleryProps) {
  const { t } = useTranslation('accounts')
  const navigate = useNavigate()
  return (
    <div data-testid="account-gallery">
      <div className="">
        <div className="flex flex-row justify-between items-baseline">
          <h1 className="text-2xl mb-5">{t('myBankAccounts')} </h1>
          <a
            onClick={() => navigate({ to: '/accounts' })}
            className="text-md text-black hover:opacity-70 underline-offset-5 hover:cursor-pointer"
          >
            {t('seeAll')}
          </a>
        </div>

        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {bankAccounts.slice(0, 3).map((account) => (
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
