import type { TransactionEntry } from '@/hooks/useFetchEntries'
import type { Transaction } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformToTransactionEntries(
  transactions: Transaction[],
  currentUserAccountId?: string, // optional, for resolving direction
): TransactionEntry[] {
  return transactions.map((tx) => {
    const isOutgoing = currentUserAccountId
      ? tx.fromAccountId === currentUserAccountId
      : tx.amount < 0

    return {
      ...tx,
      direction: isOutgoing ? 'out' : 'in',
      theAccount: isOutgoing ? tx.toAccountId : tx.fromAccountId,
      scheduledDate: null, // You can modify this if needed
    }
  })
}
