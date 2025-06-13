import { useQuery } from '@tanstack/react-query'
// import { useAuth } from '@clerk/clerk-react'
import type { AccountDetails } from '@/types'
import { getAccountDetails } from '@/api'

export function useAccountDetails() {
  return useQuery<Array<AccountDetails>>({
    queryKey: ['accountDetails'],
    queryFn: async () => {
      const token = 'MOCK_TEST_TOKEN'
      return getAccountDetails(token)
    },
  })
}

// Prepared for the real call later on

// export function useAccountDetails() {
//   const { getToken } = useAuth()

//   return useQuery<Array<AccountDetails>>({
//     queryKey: ['accountDetails'],
//     queryFn: async () => {
//       const token = await getToken()
//       return getAccountDetails(token)
//     },
//   })
// }
