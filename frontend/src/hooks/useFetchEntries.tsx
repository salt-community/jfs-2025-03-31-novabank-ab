import { useMemo } from 'react'
import { useAccounts } from './useAccounts'
import type { Transaction } from '@/types'

export type TransactionEntry = Transaction & {
  direction: 'in' | 'out'
  accountType?: string
  scheduledDate?: string | null
}

export default function useFetchEntries(transactions: TransactionEntry[]): {
  entries: TransactionEntry[]
  isLoading: boolean
} {
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
        ...tx,
        scheduledDate: tx.scheduledDate ?? null,
      }

      if (fromIsMine && toIsMine) {
        return [
          {
            ...base,
            key: tx.transactionId + '-out',
            direction: 'out',
            accountType: fromAccount?.type,
          },
          {
            ...base,
            key: tx.transactionId + '-in',
            direction: 'in',
            accountType: toAccount?.type,
          },
        ]
      } else if (fromIsMine) {
        return [
          {
            ...base,
            key: tx.transactionId + '-out',
            direction: 'out',
            accountType: fromAccount?.type,
          },
        ]
      } else if (toIsMine) {
        return [
          {
            ...base,
            key: tx.transactionId + '-in',
            direction: 'in',
            accountType: toAccount?.type,
          },
        ]
      }

      return []
    })
  }, [transactions, accounts, isLoading])

  return { entries, isLoading }
}
