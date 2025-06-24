import type { Transaction } from './'

export type Account = {
  id: string
  balance: number
  type: string
  createdAt: string
  status: string
  accountNumber: string
  currency: string
}

// Explaination: AccountDetails has all props. from Account (inherits) + their own fields/properties
export type AccountDetails = Account & {
  accountHolder: string
  transactions: Array<Transaction>
}
