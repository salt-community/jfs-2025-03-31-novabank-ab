import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Application } from '@/types/Application'
import {
  getApplications,
  approveApplication,
  rejectApplication,
} from '@/api/application'
import { sendRegisterApplication } from '@/api/application'
import type { ApplicationRequestDto } from '@/types/ApplicationRequestDto'
import { useAuth } from '@clerk/clerk-react'

export function useApplications() {
  const { getToken } = useAuth()

  return useQuery<Application[], Error>({
    queryKey: ['applications'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getApplications(token)
    },
  })
}

export function useApproveApplication() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation<void, Error, string, unknown>({
    mutationFn: async (id) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return approveApplication(token, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
    onError: (error) => {
      alert('Error approving application:' + error)
    },
  })
}

export function useRejectApplication() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation<void, Error, string, unknown>({
    mutationFn: async (id) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return rejectApplication(token, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
    onError: (error) => {
      alert('Error rejecting application:' + error)
    },
  })
}

export function useRegisterApplication() {
  return useMutation<void, Error, ApplicationRequestDto, unknown>({
    mutationFn: async (dto) => {
      return sendRegisterApplication(dto)
    },
    onSuccess: () => {
      alert('Application submitted successfully!')
    },
    onError: (error) => {
      alert('Error submitting application: ' + error.message)
    },
  })
}
