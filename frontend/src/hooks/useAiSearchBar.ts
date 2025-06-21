import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { sendTransacionSearchQuery } from '@/api'
import type { aiSearchBarQuery } from '@/types'

export function useAiSearchBar() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (data: aiSearchBarQuery) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return sendTransacionSearchQuery(data, token)
    },
  })
}
