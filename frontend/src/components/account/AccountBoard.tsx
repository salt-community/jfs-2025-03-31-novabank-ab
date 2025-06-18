import { TransactionItem } from '../generic/'
import { ScheduledTransactionItem } from '../generic'
import { NoTransactionItem } from '../generic/'
import type { Account } from '@/types'
import { useNavigate } from '@tanstack/react-router'
import { useAccountTransactions } from '@/hooks'
import Spinner from '../generic/Spinner'
import { useTranslation } from 'react-i18next'

type AccountBoardProps = {
  account: Account
}

export default function AccountBoard({ account }: AccountBoardProps) {
  const { t } = useTranslation('accounts')
  const navigate = useNavigate()
  const { data, isLoading, isError } = useAccountTransactions(account.id)

  if (isLoading) return <Spinner />
  if (isError) return <div>{t('errorLoadingTransactions')}</div>
  console.log('Account transactions:', data)
  return (
    <div data-testid="account-board">
      <h1 className="text-4xl mb-20">{account.type}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <p className="mt-4 text-gray-600 text2xl">{t('totalBalance')}</p>
          <p className="text-4xl font-bold">{account.balance}</p>
          <button
            onClick={() => navigate({ to: '/transfer' })}
            className="mt-4 cursor-pointer px-4 py-2 bg-amber-400 hover:bg-amber-500 rounded-md text-md shadow"
          >
            + {t('newTransfer')}
          </button>
        </div>

        <div className="border-l pl-8">
          <p className="text-md text-gray-500">{t('accountStatus')}</p>
          <p className="text-2xl ">{account.status}</p>
          <p className="mt-4 text-md text-gray-500">{t('accountNumber')}</p>
          <p className="text-2xl ">{account.accountNumber}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">{t('scheduledTransasctions')}</h2>
        <div className="space-y-2">
          {data && data.filter((t) => t.status === 'PENDING').length > 0 ? (
            data
              .filter((t) => t.status === 'PENDING')
              .map((t, index) => (
                <ScheduledTransactionItem
                  key={index}
                  amount={t.amount}
                  description={t.description}
                  fromAccountId={t.fromAccount}
                  ocrNumber={t.ocrNumber}
                  scheduledDate={t.date}
                  toAccountId={t.toAccount}
                  userNote={t.userNote}
                />
              ))
          ) : (
            <NoTransactionItem></NoTransactionItem>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl mb-4">{t('transasctions')}</h2>
        <div className="space-y-2">
          {data && data.filter((t) => t.status === null).length > 0 ? (
            data
              .filter((t) => t.status === null)
              .map((t, index) => (
                <TransactionItem
                  key={index}
                  name={t.description}
                  category={t.type}
                  amount={t.amount}
                  time={t.date}
                />
              ))
          ) : (
            <NoTransactionItem />
          )}
        </div>
      </div>
    </div>
  )
}
