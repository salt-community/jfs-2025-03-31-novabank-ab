import { useMemo } from 'react'
import { useAccounts } from './useAccounts'
import type { Transaction } from '@/types'

export type TransactionEntry = Transaction & {
  direction: 'in' | 'out'
  accountType?: string
  scheduledDate?: string | null
  key: string
}

export default function useFetchEntries(
  transactions: Transaction[],
  selectedAccountId?: string
): {
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
        scheduledDate: tx.status === 'PENDING' ? tx.date : null,
      }

      if (fromIsMine && toIsMine) {
        // Both accounts are "mine" (internal transfer)
        if (selectedAccountId) {
          const isTo = tx.toAccountId === selectedAccountId
          const direction = isTo ? 'in' : 'out'
          const accountType = isTo ? toAccount?.type : fromAccount?.type

          return [
            {
              ...base,
              key: `${tx.transactionId}-${direction}`,
              direction,
              accountType,
            },
          ]
        }

        // No account filter applied → show both sides
        return [
          {
            ...base,
            key: `${tx.transactionId}-out`,
            direction: 'out',
            accountType: fromAccount?.type,
          },
          {
            ...base,
            key: `${tx.transactionId}-in`,
            direction: 'in',
            accountType: toAccount?.type,
          },
        ]
      }

      if (fromIsMine) {
        return [
          {
            ...base,
            key: `${tx.transactionId}-out`,
            direction: 'out',
            accountType: fromAccount?.type,
          },
        ]
      }

      if (toIsMine) {
        return [
          {
            ...base,
            key: `${tx.transactionId}-in`,
            direction: 'in',
            accountType: toAccount?.type,
          },
        ]
      }

      // Not mine → don't show
      return []
    })
  }, [transactions, accounts, isLoading, selectedAccountId])

  return { entries, isLoading }
}
