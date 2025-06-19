import type { UserUpdateType } from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function updateUser(token: string, updatedUser: UserUpdateType) {
  const res = await fetch(`${BASE_URL}user/`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  })
  if (!res.ok) throw new Error(`User update: ${res.status}`)
}
