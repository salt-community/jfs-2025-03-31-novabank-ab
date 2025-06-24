import { useQuery } from '@tanstack/react-query'
import type { UserType } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { getUser } from '@/api'

export function useGetUser() {
  const { getToken } = useAuth()

  return useQuery<UserType>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getUser(token)
    },
  })
}
