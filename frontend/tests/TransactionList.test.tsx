import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react'
import {
  Outlet,
  RootRoute,
  Route,
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from '@tanstack/react-router'
import { TransactionList } from '../src/components/generic/TransactionList'

const testTransactions = [
  {
    id: '18031998',
    name: 'Transaction One',
    category: 'CategoryOne',
    amount: 980318.5,
    time: '18:03:1998',
  },
  {
    id: '18031999',
    name: 'Transaction Two',
    category: 'CategoryTwo',
    amount: 980319.5,
    time: '18:03:1999',
  },
]

const rootRoute = new RootRoute({
  component: Outlet,
})
const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <TransactionList transactions={testTransactions} />,
})
const router = createRouter({
  routeTree: rootRoute.addChildren([route]),
  history: createMemoryHistory(),
})

describe('Transaction List', () => {
  it('should render a Transaction List', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const transactionList = screen.getByTestId('transaction-list')
    expect(transactionList).toBeInTheDocument()
  })
  it('should render two transaction items.', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const transactionList = screen.getByTestId('transaction-list')
    const transactionItems = screen.getAllByTestId('transaction-item')
    expect(transactionList).toBeInTheDocument()
    expect(transactionItems.length).toBe(2)
  })
  it('rendered transaction items should have the correct names.', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const transactionList = screen.getByTestId('transaction-list')
    const transactionItems = screen.getAllByTestId('transaction-item')
    expect(transactionList).toBeInTheDocument()
    for (let i = 0; i < transactionItems.length; i++) {
      expect(transactionItems[i]).toHaveTextContent(testTransactions[i].name)
    }
  })
  it('rendered transaction items should have the correct categories.', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const transactionList = screen.getByTestId('transaction-list')
    const transactionItems = screen.getAllByTestId('transaction-item')
    expect(transactionList).toBeInTheDocument()
    for (let i = 0; i < transactionItems.length; i++) {
      expect(transactionItems[i]).toHaveTextContent(
        testTransactions[i].category,
      )
    }
  })
  it('rendered transaction items should have the correct amounts.', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const transactionList = screen.getByTestId('transaction-list')
    const transactionItems = screen.getAllByTestId('transaction-item')
    expect(transactionList).toBeInTheDocument()
    for (let i = 0; i < transactionItems.length; i++) {
      expect(transactionItems[i]).toHaveTextContent(
        testTransactions[i].amount.toFixed(2).toString(),
      )
    }
  })
  it('rendered transaction items should have the correct times.', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const transactionList = screen.getByTestId('transaction-list')
    const transactionItems = screen.getAllByTestId('transaction-item')
    expect(transactionList).toBeInTheDocument()
    for (let i = 0; i < transactionItems.length; i++) {
      expect(transactionItems[i]).toHaveTextContent(testTransactions[i].time)
    }
  })
})
