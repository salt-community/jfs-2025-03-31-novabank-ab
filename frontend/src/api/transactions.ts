import type { Transaction } from '@/types'

// TODO change this to correct URL in your own .env file
// LATER, import the real URL like this with correct endpoint
// const BASE_URL = import.meta.env.VITE_API_URL
const BASE_URL = '/mocks/transactions.json'

export async function getTransactions(
  token: string,
): Promise<Array<Transaction>> {
  const res = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error('Failed to fetch transactions')
  return res.json()
}
