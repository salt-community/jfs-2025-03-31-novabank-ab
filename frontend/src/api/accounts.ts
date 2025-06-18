import type { Account } from '@/types'

// TODO change this to correct URL in your own .env file
// LATER, import the real URL like this with correct endpoint
const BASE_URL = import.meta.env.VITE_BASE_URL
// const BASE_URL = '/mocks/accounts.json'

export async function getAccounts(token: string): Promise<Array<Account>> {
  const res = await fetch(BASE_URL.concat('account'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to fetch accounts')
  const data = await res.json()
  return data.accounts
}
