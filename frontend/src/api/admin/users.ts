import type { AccountDTO } from '@/types/admin/AccountDTO'
import type { User, UsersData } from '@/types/admin/user'
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

export interface ListUserResponseDto {
  users: User[]
}

export async function getAllUsers(token: string): Promise<User[]> {
  const res = await fetch(`${BASE_URL}admin/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Fetch users failed: ${res.status}`)

  const body = (await res.json()) as ListUserResponseDto
  return Array.isArray(body.users) ? body.users : []
}

export async function updateUserStatus(
  token: string,
  userId: string,
  action: 'activate' | 'suspend',
): Promise<User> {
  const res = await fetch(
    `${BASE_URL}admin/user/${userId}/status?action=${action}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )
  if (!res.ok) throw new Error(`Update status failed: ${res.status}`)
  return res.json()
}

interface AccountsResponse {
  accounts: AccountDTO[]
}

export async function getUserAccounts(
  token: string,
  userId: string,
): Promise<AccountDTO[]> {
  const res = await fetch(`${BASE_URL}admin/user/${userId}/accounts`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Fetch accounts failed: ${res.status}`)
  const body = (await res.json()) as AccountsResponse
  return Array.isArray(body.accounts) ? body.accounts : []
}
