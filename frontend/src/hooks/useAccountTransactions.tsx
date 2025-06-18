import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import type { Transaction } from '@/types'
import { getAccountTransactions } from '@/api'

export function useAccountTransactions(id: string) {
    const { getToken } = useAuth()

  return useQuery<Array<Transaction>>({
    queryKey: ['accountTransactions'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getAccountTransactions(token, id)
    },
  })
}
