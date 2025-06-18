import { useQuery } from '@tanstack/react-query'
import type { UserSettings } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { getUserSettings } from '@/api/getUserNotifications'

export function useGetUserSettings() {
  const { getToken } = useAuth()

  return useQuery<UserSettings>({
    queryKey: ['userSettings'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getUserSettings(token)
    },
  })
}
