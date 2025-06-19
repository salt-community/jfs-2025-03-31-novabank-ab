import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { User } from '@/types/admin/user'
import { getAllUsers, updateUserStatus } from '@/api/admin/users'
import type { AccountDTO } from '@/types/admin/AccountDTO'
import { getUserAccounts } from '@/api/admin/users'
import { useAuth } from '@clerk/clerk-react'

export async function useUsers() {
  const { getToken } = useAuth()
  const token = await getToken()
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: () => getAllUsers(token || ''),
  })
}

export async function useUpdateUserStatus() {
  const qc = useQueryClient()
  const { getToken } = useAuth()
  const token = await getToken()
  return useMutation<
    User,
    Error,
    { id: string; action: 'activate' | 'suspend' }
  >({
    mutationFn: ({ id, action }) => updateUserStatus(token || '', id, action),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export async function useUserAccounts(userId: string) {
  const { getToken } = useAuth()
  const token = await getToken()
  return useQuery<AccountDTO[], Error>({
    queryKey: ['user', userId, 'accounts'],
    queryFn: () => getUserAccounts(token || '', userId),
    enabled: Boolean(userId),
  })
}
