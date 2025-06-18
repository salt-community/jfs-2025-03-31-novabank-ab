import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { createTransaction } from '@/api'

export function useCreateTransaction() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (transactionPayload: {
      fromAccountNo: string
      toAccountNo: string
      type: string
      transactionDate: string
      amount: number
      description: string
      userNote: string
      ocrNumber: string
    }) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return createTransaction(transactionPayload, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
