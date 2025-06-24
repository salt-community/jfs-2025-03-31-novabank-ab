import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import type { LoanResponseDto } from '@/types/loan/LoanResponseDto'
import type { LoanApplicationRequestDto } from '@/types/loan/LoanApplicationRequestDto'
import {
  getAllLoans,
  getLoan,
  updateLoanStatus,
  createLoanFromApplication,
  createLoanApplication,
  getLoanApplication,
} from '@/api/loan'

export function useLoans() {
  const { getToken } = useAuth()
  return useQuery<LoanResponseDto[], Error>({
    queryKey: ['loans'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token')
      return getAllLoans(token)
    },
  })
}

export function useLoan(loanId: string) {
  const { getToken } = useAuth()
  return useQuery<LoanResponseDto, Error>({
    queryKey: ['loan', loanId],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token')
      return getLoan(token, loanId)
    },
    enabled: Boolean(loanId),
  })
}

export function useUpdateLoanStatus() {
  const qc = useQueryClient()
  const { getToken } = useAuth()
  return useMutation<
    LoanResponseDto,
    Error,
    { loanId: string; status: string }
  >({
    mutationFn: async ({ loanId, status }) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token')
      return updateLoanStatus(token, loanId, status)
    },
    onSuccess: () => {
      // <-- object-form here
      qc.invalidateQueries({ queryKey: ['loans'] })
    },
  })
}

export function useCreateLoanFromApplication() {
  const qc = useQueryClient()
  const { getToken } = useAuth()
  return useMutation<void, Error, string>({
    mutationFn: async (appId) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token')
      return createLoanFromApplication(token, appId)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['loans'] })
    },
  })
}

export function useCreateLoanApplication() {
  const qc = useQueryClient()
  const { getToken } = useAuth()
  return useMutation<void, Error, LoanApplicationRequestDto>({
    mutationFn: async (dto) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token')
      return createLoanApplication(token, dto)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['loans'] })
    },
  })
}

export function useLoanApplication(applicationId: string) {
  const { getToken } = useAuth()
  return useQuery<unknown, Error>({
    queryKey: ['loanApplication', applicationId],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token')
      return getLoanApplication(token, applicationId)
    },
    enabled: Boolean(applicationId),
  })
}
