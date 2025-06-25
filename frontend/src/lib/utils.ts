import type { TransactionEntry } from '@/hooks/useFetchEntries'
import type { Transaction } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformToTransactionEntries(
  transactions: Transaction[],
  currentUserAccountId?: string,
): TransactionEntry[] {
  return transactions.map((tx) => {
    const isOutgoing =
      currentUserAccountId != null
        ? tx.fromAccountId === currentUserAccountId
        : tx.amount < 0

    const direction = isOutgoing ? 'out' : 'in'

    return {
      ...tx,
      direction,
      scheduledDate: tx.status === 'PENDING' ? tx.date : null,
      key: `${tx.transactionId}-${direction}`,
    }
  })
}
