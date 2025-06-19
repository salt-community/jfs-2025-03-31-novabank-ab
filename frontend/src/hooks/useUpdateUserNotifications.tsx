import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UserSettings } from '@/types'
import { updateUserNotifications } from '@/api'
import { useAuth } from '@clerk/clerk-react'

export function useUpdateUserSettings() {
  const { getToken } = useAuth()
  const qc = useQueryClient()

  return useMutation<void, Error, UserSettings>({
    mutationFn: async (updateNotifications) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return updateUserNotifications(token, updateNotifications)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['userSettings'] }),
  })
}
