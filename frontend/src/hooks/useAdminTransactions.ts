import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import type { Transaction } from '@/types'

export function useAdminTransactions() {
  const { getToken } = useAuth()

  return useQuery<Array<Transaction>>({
    queryKey: ['adminTransactions'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getAdminTransactions(token)
    },
  })
}

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getAdminTransactions(
  token: string,
): Promise<Array<Transaction>> {
  const res = await fetch(BASE_URL.concat('admin/transaction-history'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to fetch transactions')
  const data = await res.json()
  return data
}
