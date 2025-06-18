import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { User } from '@/types/admin/user'
import { getAllUsers, updateUserStatus } from '@/api/admin/users'
import type { AccountDTO } from '@/types/admin/AccountDTO'
import { getUserAccounts } from '@/api/admin/users'
const TOKEN = import.meta.env.VITE_TOKEN || ''

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: () => getAllUsers(TOKEN),
  })
}

export function useUpdateUserStatus() {
  const qc = useQueryClient()
  return useMutation<
    User,
    Error,
    { id: string; action: 'activate' | 'suspend' }
  >({
    mutationFn: ({ id, action }) => updateUserStatus(TOKEN, id, action),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export function useUserAccounts(userId: string) {
  return useQuery<AccountDTO[], Error>({
    queryKey: ['user', userId, 'accounts'],
    queryFn: () => getUserAccounts(TOKEN, userId),
    enabled: Boolean(userId),
  })
}
