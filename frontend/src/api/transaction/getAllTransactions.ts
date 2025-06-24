import type { TransactionResponse } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getAllTransactions(
  token: string,
  page: number = 0,
  size: number = 10,
  id?: string,
): Promise<TransactionResponse> {
  const url = new URL(BASE_URL + 'account/all-transactions')
  url.searchParams.append('page', page.toString())
  url.searchParams.append('size', size.toString())
  if (id) {
    url.searchParams.append('id', id)
  }

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
