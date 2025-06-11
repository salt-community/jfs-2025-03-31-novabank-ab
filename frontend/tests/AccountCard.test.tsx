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
  it('should verify the correct accountNumber is displayed', () => {
    render(<AccountCard account={testAccount} />)
    const accountName = screen.getByTestId('account-name')
    expect(accountName).toBeInTheDocument()
  })
})
