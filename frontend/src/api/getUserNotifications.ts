import type { UserSettings } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getUserSettings(token: string): Promise<UserSettings> {
  const res = await fetch(BASE_URL.concat('user/settings'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to fetch user notifications')
  const data = await res.json()
  return data
}
