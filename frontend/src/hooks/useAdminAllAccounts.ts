import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import type { AccountsResponse } from '@/types/admin/AccountDTO'

export function useAdminAccounts() {
  const { getToken } = useAuth()

  return useQuery<AccountsResponse>({
    queryKey: ['adminAccounts'],
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
): Promise<AccountsResponse> {
  const res = await fetch(BASE_URL.concat('admin/all-accounts'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to fetch accounts')
  const data = await res.json()
  return data
}
