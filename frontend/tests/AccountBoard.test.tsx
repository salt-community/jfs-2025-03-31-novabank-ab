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
    const accountBord = screen.getByTestId('account-board')
    expect(accountBord).toBeInTheDocument()
  })
  //   it('should verify the correct transaction item time is displayed', () => {
  //     render(
  //       <TransactionItem
  //         amount={testTransaction.amount}
  //         category={testTransaction.category}
  //         name={testTransaction.name}
  //         time={testTransaction.time}
  //       />,
  //     )
  //     const transactionItem = screen.getByTestId('transaction-item')
  //     expect(transactionItem).toBeInTheDocument()
  //     expect(transactionItem).toHaveTextContent(testTransaction.time)
  //   })
})
