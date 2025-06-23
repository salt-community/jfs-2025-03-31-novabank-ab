export type BankAccountType = 'PERSONAL' | 'SAVINGS'
export type AccountStatus = 'ACTIVE' | 'SUSPENDED'

export interface AccountDTO {
  id: string
  balance: number
  type: BankAccountType
  createdAt: string // ISO date
  status: AccountStatus
  accountNumber: string
}

export type AccountsResponse = {
  accounts: AccountDTO[]
}
