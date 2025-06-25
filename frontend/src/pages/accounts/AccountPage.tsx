import AccountBoard from '@/components/account/AccountBoard'
import { useAccount } from '@/hooks'
import { useTranslation } from 'react-i18next'

type AccountPageProps = {
  id: string
}

export default function AccountPage({ id }: AccountPageProps) {
  const { data: account, isLoading, isError } = useAccount(id)
  const { t } = useTranslation('accounts')

  if (isLoading) return <div className="p-8">{t('loadingDetails')}</div>
  if (isError)
    return <div className="p-8 text-red-500">{t('failedLoadingAccount')}</div>

  if (account === undefined) {
    return <div className="p-8 text-red-500">{t('failedFindingAccNo')}</div>
  }

  return <AccountBoard account={account} />
}
