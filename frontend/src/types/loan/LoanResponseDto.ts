import type { AccountResponseDto } from './AccountResponseDto'

export type LoanStatus = 'PENDING' | 'ACTIVE' | 'PAID' | 'DEFAULTED'

export interface LoanResponseDto {
  account: AccountResponseDto
  interestRate: number
  originalAmount: number
  remainingAmount: number
  startDate: string
  dueDate: string
  status: LoanStatus
}

export interface ListLoanResponseDto {
  loans: LoanResponseDto[]
}
