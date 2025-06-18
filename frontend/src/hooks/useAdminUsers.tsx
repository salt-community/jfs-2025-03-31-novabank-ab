import { getUsers } from '@/api/admin/users'
import type { UsersData } from '@/types/admin/user'
import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'

export function useAdminUser() {
  const { getToken } = useAuth()

  return useQuery<UsersData>({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getUsers(token)
    },
  })
}
