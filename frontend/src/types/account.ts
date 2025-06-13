import type { Transaction } from './'

export type Account = {
  name: string
  number: string
  balance: number
}

// Explaination: AccountDetails has all props. from Account (inherits) + their own fields/properties
export type AccountDetails = Account & {
  accountHolder: string
  transactions: Array<Transaction>
}
