import { useMemo } from 'react'
import { useAccounts } from './useAccounts'
import type { Transaction } from '@/types'

type TransactionEntry = {
  key: string
  transactionId: string
  description: string
  accountNoType: string
  amount: number
  time: string
  direction: 'in' | 'out'
  theAccount?: string
  category: string
}

export default function useFetchEntries(transactions: Transaction[]) {
  const { data: accounts = [], isLoading } = useAccounts()

  const entries: TransactionEntry[] = useMemo(() => {
    if (isLoading) return []

    const myAccountIds = new Set(accounts.map((a) => a.id))

    return transactions.flatMap((tx) => {
      const fromIsMine = myAccountIds.has(tx.fromAccountId)
      const toIsMine = myAccountIds.has(tx.toAccountId)

      const fromAccount = accounts.find((a) => a.id === tx.fromAccountId)
      const toAccount = accounts.find((a) => a.id === tx.toAccountId)

      const base = {
        transactionId: tx.transactionId,
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        category: tx.category,
      }

      if (fromIsMine && toIsMine) {
        return [
          {
            ...base,
            key: tx.transactionId + '-out',
            direction: 'out' as const,
            theAccount: fromAccount?.type,
          },
          {
            ...base,
            key: tx.transactionId + '-in',
            direction: 'in' as const,
            theAccount: toAccount?.type,
          },
        ]
      } else if (fromIsMine) {
        return [
          {
            ...base,
            key: tx.transactionId + '-out',
            direction: 'out' as const,
            theAccount: fromAccount?.type,
          },
        ]
      } else if (toIsMine) {
        return [
          {
            ...base,
            key: tx.transactionId + '-in',
            direction: 'in' as const,
            theAccount: toAccount?.type,
          },
        ]
      }

      return []
    })
  }, [transactions, accounts, isLoading])

  return { entries, isLoading }
}
