import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import type { Transaction } from '@/types'
import { getTransactions } from '@/api'

export function useTransactions() {
  const { getToken } = useAuth()

  return useQuery<Array<Transaction>>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getTransactions(token)
    },
  })
}

// Prepared for the real call later on

// export function useTransactions() {
//   const { getToken } = useAuth()

//   return useQuery<Array<Transaction>>({
//     queryKey: ['transactions'],
//     queryFn: async () => {
//       const token = await getToken()
//       return getTransactions(token)
//     },
//   })
// }
