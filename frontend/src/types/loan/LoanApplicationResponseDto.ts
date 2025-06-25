import type { User } from '../admin/user'

export type LoanApplicationStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'

export interface LoanApplicationResponseDto {
  id: string
  user: User
  amount: number
  termMonths: number
  interestRate: number
  status: LoanApplicationStatus
  createdAt: string
  updatedAt: string
}

export interface ListLoanApplicationResponseDto {
  loanApplications: LoanApplicationResponseDto[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}
