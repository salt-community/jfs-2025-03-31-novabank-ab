import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import type { TransactionResponse } from '@/types'
import { getAllTransactions } from '@/api'

export function useGetAllTransactions(
  page: number = 0,
  size: number = 10,
  accountId?: string,
  minAmount?: string,
  maxAmount?: string
) {
  const { getToken } = useAuth()

  return useQuery<TransactionResponse>({
    queryKey: ['transactions', page, size, accountId, minAmount, maxAmount],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getAllTransactions(token, page, size, accountId, minAmount, maxAmount)
    },
    staleTime: 1000 * 60,
  })
}
