import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { createAccount } from '@/api'

export function useCreateAccount() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { type: string; currency: string }) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return createAccount(data, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}
