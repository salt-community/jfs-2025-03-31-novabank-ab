import type { UserType } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getUser(token: string): Promise<UserType> {
  const res = await fetch(BASE_URL.concat('user/'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to fetch user')
  const data = await res.json()
  return data
}
