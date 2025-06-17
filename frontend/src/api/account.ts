import type { Account } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getAccount(token: string, id: string): Promise<Account> {
  const res = await fetch(BASE_URL.concat('account/', id), {
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
