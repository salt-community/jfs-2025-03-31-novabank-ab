import type {
  aiSearchBarQuery,
  aiTransactionIds,
  Transaction,

} from '@/types'
const BASE_URL = import.meta.env.VITE_BASE_URL

export async function sendTransacionSearchQuery(
  query: aiSearchBarQuery,
  token: string,
): Promise<aiTransactionIds> {
  const response = await fetch(BASE_URL.concat('gemini/search-transactions'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(query),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to send search query')
  }

  const data = await response.json()
  return data
}

export async function sendListOfTransactionIds(
  ids: aiTransactionIds,
  token: string,
): Promise<Array<Transaction>> {
  const response = await fetch(
    BASE_URL.concat('account/transaction/all-transactions-by-ids'),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ids),
      credentials: 'include',
    },
  )

  if (!response.ok) {
    throw new Error('Failed to send list of transactions ids')
  }

  const data = await response.json()
  return data
}
