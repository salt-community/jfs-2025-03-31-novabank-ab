import type { Transaction } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getAllTransactions(token: string): Promise<Array<Transaction>> {
  const res = await fetch(BASE_URL.concat('account/all-transactions'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to fetch transactions')
  const data = await res.json()
  return data.content
}
