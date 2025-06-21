export type aiSearchBarQuery = {
  query: string
}

export type aiTransactionIds = {
  matchingTransactionIds: Array<string>
}

export type TransactionFromId = {
  transactionId: string
  fromAccountId: string
  toAccountId: string
  date: string
  amount: number
  description: string
  userNote: string
  ocrNumber: string
  type: string
  status: string | null
  category: string | null
}
