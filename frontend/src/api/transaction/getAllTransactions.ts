import type { TransactionResponse } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getAllTransactions(
  token: string,
  page: number = 0,
  size: number = 10,
  id?: string,
  minAmount?: string,
  maxAmount?: string,
  category?: string,
): Promise<TransactionResponse> {
  const url = new URL(BASE_URL + 'account/all-transactions')

  url.searchParams.append('page', page.toString())
  url.searchParams.append('size', size.toString())
  if (id) url.searchParams.append('id', id)
  if (minAmount) url.searchParams.append('minAmount', minAmount)
  if (maxAmount) url.searchParams.append('maxAmount', maxAmount)
  if (category) url.searchParams.append('category', category)

  const res = await fetch(url.toString(), {
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
