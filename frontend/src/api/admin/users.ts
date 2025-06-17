import type { UsersData } from '@/types/admin/user'
const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getUsers(token: string): Promise<UsersData> {
  const res = await fetch(BASE_URL.concat('admin/user'), {
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
