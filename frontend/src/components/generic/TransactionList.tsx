import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { AllTransactionsItem } from './AllTransactionsItem'
import { useAccounts } from '@/hooks'
import type { Transaction } from '@/types'
import Spinner from '@/components/generic/Spinner'

type TransactionListProps = {
  transactions: Array<Transaction>
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { t } = useTranslation('accounts')
  const navigate = useNavigate()

  const { data: accounts = [], isLoading: accountsLoading } = useAccounts()

  if (accountsLoading) return <Spinner />

  const myAccountIds = new Set(accounts.map((a) => a.id))

  const transactionEntries: {
    key: string
    description: string
    accountNoType: string
    amount: number
    time: string
    direction: 'in' | 'out'
    theAccount?: string
  }[] = []

  const seenTxIds = new Set<string>()

  transactions.forEach((tx) => {
    if (seenTxIds.has(tx.transactionId)) return
    seenTxIds.add(tx.transactionId)

    const fromIsMine = myAccountIds.has(tx.fromAccountId)
    const toIsMine = myAccountIds.has(tx.toAccountId)

    const fromAccount = accounts.find((a) => a.id === tx.fromAccountId)
    const toAccount = accounts.find((a) => a.id === tx.toAccountId)

    if (fromIsMine && toIsMine) {
      // Internal transfer: show both sides
      transactionEntries.push({
        key: tx.transactionId + '-out',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'out',
        theAccount: fromAccount?.type,
      })
      transactionEntries.push({
        key: tx.transactionId + '-in',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'in',
        theAccount: toAccount?.type,
      })
    } else if (fromIsMine) {
      transactionEntries.push({
        key: tx.transactionId + '-out',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'out',
        theAccount: fromAccount?.type,
      })
    } else if (toIsMine) {
      transactionEntries.push({
        key: tx.transactionId + '-in',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'in',
        theAccount: toAccount?.type,
      })
    }
  })

  // Sort by date descending and take latest 3
  transactionEntries.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  const latestThree = transactionEntries.slice(0, 3)

  return (
    <div className="mt-10" data-testid="transaction-list">
      <div className="flex flex-row justify-between items-baseline">
        <h1 className="text-2xl mb-5">{t('recentTransactions')}</h1>
        <a
          onClick={() => navigate({ to: '/transactions' })}
          className="text-md text-black hover:opacity-70 underline-offset-5 hover:cursor-pointer"
        >
          {t('seeAll')}
        </a>
      </div>

      <div className="px-5 border-1 border-gray-100 shadow-sm p-1">
        {latestThree.length === 0 ? (
          <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
        ) : (
          latestThree.map((tx) => (
            <AllTransactionsItem
              key={tx.key}
              description={tx.description}
              theAccount={tx.theAccount}
              accountNoType={tx.accountNoType}
              amount={tx.amount}
              time={tx.time}
              direction={tx.direction}
            />
          ))
        )}
      </div>
    </div>
  )
}
