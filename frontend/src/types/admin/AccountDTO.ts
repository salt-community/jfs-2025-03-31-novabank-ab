export type BankAccountType = 'PERSONAL' | 'BUSINESS'
export type AccountStatus = 'ACTIVE' | 'SUSPENDED'

export interface AccountDTO {
  id: string
  balance: number
  type: BankAccountType
  createdAt: string // ISO date
  status: AccountStatus
  accountNumber: string
}
