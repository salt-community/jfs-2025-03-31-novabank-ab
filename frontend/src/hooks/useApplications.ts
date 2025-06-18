import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Application } from '@/types/Application'
import {
  getApplications,
  approveApplication,
  rejectApplication,
} from '@/api/application'
import { sendRegisterApplication } from '@/api/application'
import type { ApplicationRequestDto } from '@/types/ApplicationRequestDto'

const TOKEN = import.meta.env.VITE_TOKEN || ''

export function useApplications() {
  return useQuery<Application[], Error>({
    queryKey: ['applications'],
    queryFn: async () => {
      return getApplications(TOKEN)
    },
  })
}

export function useApproveApplication() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: (id) => {
      return approveApplication(TOKEN, id)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['applications'] }),
  })
}

export function useRejectApplication() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: (id) => {
      return rejectApplication(TOKEN, id)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['applications'] }),
  })
}

export function useRegisterApplication() {
  return useMutation<void, Error, ApplicationRequestDto>({
    mutationFn: (dto) => sendRegisterApplication(dto),
  })
}
