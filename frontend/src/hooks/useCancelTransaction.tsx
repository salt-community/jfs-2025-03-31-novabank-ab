import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { cancelTransaction } from '@/api/cancelTransaction'

export function useCancelTransaction() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (transactionId: string) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return cancelTransaction(token, transactionId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountTransactions'] })
    },
  })
}
