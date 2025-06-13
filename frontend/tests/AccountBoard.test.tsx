import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AccountBoard from '../src/components/account/AccountBoard'
import type { AccountDetails, Transaction } from '@/types'

const testTransactions: Array<Transaction> = [
  {
    amount: 50,
    category: 'Games',
    id: 'TestId',
    name: 'Skyrim',
    time: '18:03:18:1998',
  },
  {
    amount: 180,
    category: 'Food',
    id: 'TestId',
    name: 'Tomatoes',
    time: '18:03:18:1995',
  },
]

const testAccountDetails: AccountDetails = {
  accountHolder: 'Aki',
  balance: 200000000.123123,
  name: 'Savings',
  number: '****2201',
  transactions: testTransactions,
}

describe('Account Board', () => {
  it('should render an AccountBoard', () => {
    render(<AccountBoard account={testAccountDetails} />)
    const accountBoard = screen.getByTestId('account-board')
    expect(accountBoard).toBeInTheDocument()
  })
  it('should verify the correct total balance is displayed', () => {
    render(<AccountBoard account={testAccountDetails} />)
    const accountBoard = screen.getByTestId('account-board')
    expect(accountBoard).toBeInTheDocument()
    expect(accountBoard).toHaveTextContent(
      testAccountDetails.balance.toFixed(2).toString(),
    )
  })
  it('should verify the correct account holder is displayed', () => {
    render(<AccountBoard account={testAccountDetails} />)
    const accountBoard = screen.getByTestId('account-board')
    expect(accountBoard).toBeInTheDocument()
    expect(accountBoard).toHaveTextContent(testAccountDetails.accountHolder)
  })
})
