import type { UserSettings } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function updateUserNotifications(
  token: string,
  updateNotifications: UserSettings,
) {
  const res = await fetch(`${BASE_URL}user/settings`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateNotifications),
  })
  if (!res.ok) throw new Error(`User settings update: ${res.status}`)
}
