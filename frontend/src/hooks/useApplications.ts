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

export async function useApplications() {
  const { getToken } = useAuth()
  const token = await getToken()
  return useQuery<Application[], Error>({
    queryKey: ['applications'],
    queryFn: async () => {
      return getApplications(token || '')
    },
  })
}

export async function useApproveApplication() {
  const qc = useQueryClient()
  const { getToken } = useAuth()
  const token = await getToken()
  return useMutation<void, Error, string>({
    mutationFn: (id) => {
      return approveApplication(token || '', id)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['applications'] }),
  })
}

export async function useRejectApplication() {
  const qc = useQueryClient()
  const { getToken } = useAuth()
  const token = await getToken()
  return useMutation<void, Error, string>({
    mutationFn: (id) => {
      return rejectApplication(token || '', id)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['applications'] }),
  })
}

export function useRegisterApplication() {
  return useMutation<void, Error, ApplicationRequestDto>({
    mutationFn: (dto) => sendRegisterApplication(dto),
  })
}
