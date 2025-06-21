import type { TransactionResponse } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getAllTransactions(
  token: string,
  page: number = 0,
  size: number = 10,
): Promise<TransactionResponse> {
  const url = BASE_URL.concat(
    'account/all-transactions?page=',
    page,
    '&size=',
    size,
  )

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to fetch transactions')

  return await res.json()
}
