import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import AccountCard from '../src/components/dashboard/AccountCard'
import '@testing-library/jest-dom'

const testAccount = {
  accountName: 'Savings',
  accountNumber: '**** 2201',
  balance: 4465.23,
}

describe('AccountCard', () => {
  it('should render an AccountCard', () => {
    render(<AccountCard account={testAccount} />)
    const card = screen.getByTestId('account-card')
    expect(card).toBeInTheDocument()
  })
  it('should verify the correct accountName is displayed', () => {
    render(<AccountCard account={testAccount} />)
    const accountName = screen.getByTestId('account-name')
    expect(accountName).toBeInTheDocument()
    expect(accountName).toHaveTextContent(testAccount.accountName)
  })
  it('should verify that the correct accountNumber is displayed', () => {
    render(<AccountCard account={testAccount} />)
    const accountNumber = screen.getByTestId('account-number')
    expect(accountNumber).toBeInTheDocument()
    expect(accountNumber).toHaveTextContent(testAccount.accountNumber)
  })
  it('should verify that the correct balance is displayed', () => {
    render(<AccountCard account={testAccount} />)
    const balance = screen.getByTestId('account-balance')
    expect(balance).toBeInTheDocument()
    expect(balance).toHaveTextContent(testAccount.balance.toString())
  })
})
