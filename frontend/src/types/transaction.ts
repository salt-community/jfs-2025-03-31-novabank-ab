export type TransactionType = 'INTERNAL_TRANSFER' | 'BANKGIRO' | 'PLUSGIRO'

export interface Transaction {
  transactionId: string
  fromAccountId: string
  toAccountId: string
  date: string // ISO date string
  amount: number
  description: string
  userNote: string
  ocrNumber: string
  type: TransactionType
  status: string | null
  category: string
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface TransactionResponse {
  content: Transaction[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}
