import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { User } from '@/types/admin/user'
import type { AccountDTO } from '@/types/admin/AccountDTO'
import {
  getAllUsers,
  getUserAccounts,
  updateUserStatus,
} from '@/api/admin/users'
import { useAuth } from '@clerk/clerk-react'

export function useUsers() {
  const { getToken } = useAuth()

  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getAllUsers(token)
    },
  })
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation<
    User,
    Error,
    { id: string; action: 'activate' | 'suspend' },
    unknown
  >({
    mutationFn: async ({ id, action }) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return updateUserStatus(token, id, action)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export function useUserAccounts(userId: string) {
  const { getToken } = useAuth()

  return useQuery<AccountDTO[], Error>({
    queryKey: ['user', userId, 'accounts'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getUserAccounts(token, userId)
    },
    enabled: Boolean(userId),
  })
}
