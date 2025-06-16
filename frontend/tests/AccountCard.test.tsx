import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import AccountCard from '../src/components/dashboard/AccountCard'
import '@testing-library/jest-dom'

const testAccount = {
  id: '1',
  name: 'Test Account',
  number: '**** 1818',
  balance: 1803.98,
  type: 'checking',
  createdAt: '2023-01-01T00:00:00Z',
  status: 'active',
  accountNumber: '1818',
}

describe('AccountCard', () => {
  it('should render an AccountCard', () => {
    render(<AccountCard account={testAccount} />)
    const card = screen.getByTestId('account-card')
    expect(card).toBeInTheDocument()
  })
  // it('should verify the correct accountName is displayed', () => {
  //   render(<AccountCard account={testAccount} />)
  //   const accountName = screen.getByTestId('account-name')
  //   expect(accountName).toBeInTheDocument()
  //   expect(accountName).toHaveTextContent(testAccount.name)
  // })
  // it('should verify that the correct accountNumber is displayed', () => {
  //   render(<AccountCard account={testAccount} />)
  //   const accountNumber = screen.getByTestId('account-number')
  //   expect(accountNumber).toBeInTheDocument()
  //   expect(accountNumber).toHaveTextContent(testAccount.number)
  // })
  it('should verify that the correct balance is displayed', () => {
    render(<AccountCard account={testAccount} />)
    const balance = screen.getByTestId('account-balance')
    expect(balance).toBeInTheDocument()
    expect(balance).toHaveTextContent(testAccount.balance.toString())
  })
})
