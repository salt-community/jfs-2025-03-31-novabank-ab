import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AccountBoard from '../src/components/account/AccountBoard'
import type { AccountDetails, Transaction } from '@/types'

// Define test transactions
const testTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Groceries',
    category: 'Food',
    amount: 50.25,
    time: '2024-06-16T10:00:00Z',
  },
  {
    id: '2',
    name: 'Salary',
    category: 'Income',
    amount: 1500.0,
    time: '2024-06-15T09:00:00Z',
  },
]

// Define test account details with all required fields
const testAccountDetails: AccountDetails = {
  id: 'acc-001',
  type: 'checking',
  createdAt: '2024-06-01T08:00:00Z',
  status: 'active',
  accountHolder: 'Aki',
  accountNumber: '1234567890',
  balance: 1550.25,
  transactions: testTransactions,
}

describe('Account Board', () => {
  it('should render an AccountBoard', () => {
    render(<AccountBoard account={testAccountDetails} />)
    const accountBoard = screen.getByTestId('account-board')
    expect(accountBoard).toBeInTheDocument()
  })

  it('should display the correct total balance', () => {
    render(<AccountBoard account={testAccountDetails} />)
    expect(screen.getByTestId('account-board')).toHaveTextContent(
      testAccountDetails.balance.toFixed(2),
    )
  })

  it('should display the correct account holder', () => {
    render(<AccountBoard account={testAccountDetails} />)
    expect(screen.getByTestId('account-board')).toHaveTextContent(
      testAccountDetails.accountHolder,
    )
  })

  it('should display the correct account number', () => {
    render(<AccountBoard account={testAccountDetails} />)
    expect(screen.getByTestId('account-board')).toHaveTextContent(
      testAccountDetails.accountNumber,
    )
  })

  it('should display the correct number of transaction items', () => {
    render(<AccountBoard account={testAccountDetails} />)
    const transactionItems = screen.getAllByTestId('transaction-item')
    expect(transactionItems.length).toBe(testTransactions.length)
  })

  it('should display the correct names for transaction items', () => {
    render(<AccountBoard account={testAccountDetails} />)
    const transactionItems = screen.getAllByTestId('transaction-item')
    transactionItems.forEach((item, i) => {
      expect(item).toHaveTextContent(testTransactions[i].name)
    })
  })

  it('should display the correct categories for transaction items', () => {
    render(<AccountBoard account={testAccountDetails} />)
    const transactionItems = screen.getAllByTestId('transaction-item')
    transactionItems.forEach((item, i) => {
      expect(item).toHaveTextContent(testTransactions[i].category)
    })
  })

  it('should display the correct amounts for transaction items', () => {
    render(<AccountBoard account={testAccountDetails} />)
    const transactionItems = screen.getAllByTestId('transaction-item')
    transactionItems.forEach((item, i) => {
      expect(item).toHaveTextContent(testTransactions[i].amount.toFixed(2))
    })
  })

  it('should display the correct times for transaction items', () => {
    render(<AccountBoard account={testAccountDetails} />)
    const transactionItems = screen.getAllByTestId('transaction-item')
    transactionItems.forEach((item, i) => {
      expect(item).toHaveTextContent(testTransactions[i].time)
    })
  })
})
