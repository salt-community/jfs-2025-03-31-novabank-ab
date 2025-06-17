import type { Account } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function createAccount(
  account: { type: string; currency: string },
  token: string,
): Promise<Account> {
  const response = await fetch(BASE_URL.concat('account/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(account),
  })

  if (!response.ok) {
    throw new Error('Failed to create account')
  }

  return response.json()
}
