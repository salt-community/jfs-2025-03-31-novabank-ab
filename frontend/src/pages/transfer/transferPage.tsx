import { useTranslation } from 'react-i18next'
import TransactionForm from '@/components/transfer/TransactionForm'

export default function TransferPage() {
  const { t } = useTranslation('accounts')
  return (
    <>
      <h1 className="text-3xl mb-20">{t('newTransfer')}</h1>
      <TransactionForm />
    </>
  )
}
