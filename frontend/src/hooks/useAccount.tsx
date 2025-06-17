import { useQuery } from '@tanstack/react-query'
import type { Account } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { getAccount } from '@/api'

export function useAccount(id: string) {
  const { getToken } = useAuth()

  return useQuery<Account>({
    queryKey: ['account', id],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getAccount(token, id)
    },
  })
}
