import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import type { Transaction } from '@/types'
import { getAllTransactions } from '@/api'

export function useGetAllTransactions() {
  const { getToken } = useAuth()

  return useQuery<Array<Transaction>>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getAllTransactions(token)
    },
  })
}
