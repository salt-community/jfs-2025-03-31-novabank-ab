import { useQuery } from '@tanstack/react-query'
// import { useAuth } from '@clerk/clerk-react'
import type { Account } from '@/types'
import { getAccounts } from '@/api'

export function useAccounts() {
  return useQuery<Array<Account>>({
    queryKey: ['accounts'],
    queryFn: async () => {
      const token = 'MOCK_TEST_TOKEN'
      return getAccounts(token)
    },
  })
}

// Prepared for the real call later on

// export function useAccounts() {
//   const { getToken } = useAuth()

//   return useQuery<Array<Account>>({
//     queryKey: ['accounts'],
//     queryFn: async () => {
//       const token = await getToken()
//       return getAccounts(token)
//     },
//   })
// }
