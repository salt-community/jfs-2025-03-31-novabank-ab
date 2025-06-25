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
  approveLoan,
  rejectLoan,
  getLoanApplications,
} from '@/api/loan'
import type { ListLoanApplicationResponseDto } from '@/types/loan/LoanApplicationResponseDto'

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

export function useApproveLoanApplication() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation<void, Error, string, unknown>({
    mutationFn: async (id) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return approveLoan(token, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loanApplications'] })
    },
    onError: (error) => {
      alert('Error approving application:' + error)
    },
  })
}

export function useRejectLoanApplication() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation<void, Error, string, unknown>({
    mutationFn: async (id) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return rejectLoan(token, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loanApplications'] })
    },
    onError: (error) => {
      alert('Error rejecting application:' + error)
    },
  })
}

export function useLoanApplications(page = 0, size = 10) {
  const { getToken } = useAuth()

  return useQuery<ListLoanApplicationResponseDto, Error>({
    queryKey: ['loanApplications', page, size],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return getLoanApplications(token, page, size)
    },
  })
}
