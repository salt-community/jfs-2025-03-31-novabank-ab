import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import TransactionItem from '../src/components/generic/TransactionItem'
import '@testing-library/jest-dom'

const testTransaction = {
  name: 'Spendings Test',
  category: 'Digital Game',
  amount: 18.8888,
  time: '18:03:1998',
}

describe('Transaction Item', () => {
  it('should render a transaction item', () => {
    render(
      <TransactionItem
        amount={testTransaction.amount}
        category={testTransaction.category}
        name={testTransaction.name}
        time={testTransaction.time}
      />,
    )
    const transactionItem = screen.getByTestId('transaction-item')
    expect(transactionItem).toBeInTheDocument()
  })
  it('should verify the correct item time is displayed', () => {
    render(
      <TransactionItem
        amount={testTransaction.amount}
        category={testTransaction.category}
        name={testTransaction.name}
        time={testTransaction.time}
      />,
    )
    const transactionItem = screen.getByTestId('transaction-item')
    expect(transactionItem).toBeInTheDocument()
    expect(transactionItem).toHaveTextContent(testTransaction.time)
  })
  it('should verify the correct item name is displayed', () => {
    render(
      <TransactionItem
        amount={testTransaction.amount}
        category={testTransaction.category}
        name={testTransaction.name}
        time={testTransaction.time}
      />,
    )
    const transactionItem = screen.getByTestId('transaction-item')
    expect(transactionItem).toBeInTheDocument()
    expect(transactionItem).toHaveTextContent(testTransaction.name)
  })
  it('should verify the correct item category is displayed', () => {
    render(
      <TransactionItem
        amount={testTransaction.amount}
        category={testTransaction.category}
        name={testTransaction.name}
        time={testTransaction.time}
      />,
    )
    const transactionItem = screen.getByTestId('transaction-item')
    expect(transactionItem).toBeInTheDocument()
    expect(transactionItem).toHaveTextContent(testTransaction.category)
  })
})
