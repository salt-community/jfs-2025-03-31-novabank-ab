import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UserUpdateType } from '@/types'
import { updateUser } from '@/api'
import { useAuth } from '@clerk/clerk-react'

export function useUpdateUser() {
  const { getToken } = useAuth()
  const qc = useQueryClient()

  return useMutation<void, Error, UserUpdateType>({
    mutationFn: async (updatedUser) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return updateUser(token, updatedUser)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['user'] }),
  })
}
