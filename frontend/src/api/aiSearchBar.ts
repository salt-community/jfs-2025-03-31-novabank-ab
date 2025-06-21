import type { aiSearchBarQuery } from '@/types'
const BASE_URL = import.meta.env.VITE_BASE_URL

export async function sendTransacionSearchQuery(
  query: aiSearchBarQuery,
  token: string,
): Promise<boolean> {
  const response = await fetch(BASE_URL.concat('gemini/search-transactions/'), {
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

  return response.ok
}
