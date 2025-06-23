import { useTranslation } from 'react-i18next'
import TransactionForm from '@/components/transaction/TransactionForm'

export default function TransferPage() {
  const { t } = useTranslation('accounts')
  return (
    <>
      <h1 className="text-3xl mb-20 px-4 sm:px-8 py-6 space-y-12">
        {t('newTransfer')}
      </h1>
      <TransactionForm />
    </>
  )
}
