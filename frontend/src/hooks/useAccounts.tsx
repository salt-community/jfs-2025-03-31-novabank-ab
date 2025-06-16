import { useQuery } from '@tanstack/react-query'
import type { Account } from '@/types'
import { getAccounts } from '@/api'
import { useAuth } from '@clerk/clerk-react'

// export function useAccounts() {
//   return useQuery<Array<Account>>({
//     queryKey: ['accounts'],
//     queryFn: async () => {
//       const token = 'MOCK_TEST_TOKEN'
//       return getAccounts(token)
//     },
//   })
// }

// Prepared for the real call later on

export function useAccounts() {
  const { getToken } = useAuth()

  return useQuery<Array<Account>>({
    queryKey: ['accounts'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getAccounts(token)
    },
  })
}
