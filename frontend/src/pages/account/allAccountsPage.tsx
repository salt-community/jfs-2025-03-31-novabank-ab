import { AccountsBoard } from '@/components/accounts'
import Spinner from '@/components/generic/Spinner'
import { useAccounts } from '@/hooks'
import { useTranslation } from 'react-i18next'

export default function AllAccountsPage() {
  const { data: accounts = [], isLoading, isError } = useAccounts()
  const { t } = useTranslation('accounts')

  if (isLoading) return <Spinner />

  if (isError)
    return <div className="p-8 text-red-500">{t('failedToLoadAccounts')}</div>

  return <AccountsBoard bankAccounts={accounts} />
}
