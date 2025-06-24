export type TransactionType = 'INTERNAL_TRANSFER' | 'BANKGIRO' | 'PLUSGIRO'

export interface Transaction {
  transactionId: string
  fromAccountId: string
  toAccountId: string // or | null if BG/PG transaction?
  date: string // ISO date string

  amount: number
  convertedAmount: number
  currencyFrom: string // like SEK or EUR
  currencyTo: string
  rateUsed: number
  rateDate: string // ISO date string (date for the rate used)

  description: string
  userNote: string
  ocrNumber: string
  type: TransactionType
  category: string

  status: string
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
