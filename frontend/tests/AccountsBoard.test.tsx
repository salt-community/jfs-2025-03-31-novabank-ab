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
import { AccountsBoard } from '../src/components/accounts/AccountsBoard'

const testAccounts = [
  {
    id: 'testId-123456789',
    balance: 1803.98,
    type: 'Test Account',
    createdAt: '20250616',
    status: 'Active',
    accountNumber: '**** 1818',
  },
  {
    id: 'testId-987654321',
    balance: 2000,
    type: 'Test Account',
    createdAt: '20250616',
    status: 'Active',
    accountNumber: '**** 4444',
  },
  {
    id: 'testId-5748392038',
    balance: 456000.98,
    type: 'Test Account',
    createdAt: '20250617',
    status: 'Active',
    accountNumber: '**** 1202',
  },
]

const rootRoute = new RootRoute({
  component: Outlet,
})
const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <AccountsBoard bankAccounts={testAccounts} />,
})
const router = createRouter({
  routeTree: rootRoute.addChildren([route]),
  history: createMemoryHistory(),
})

describe('AccountItem', () => {
  it('should render an AccountsBoard', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountsBoard = screen.getByTestId('accounts-board')
    expect(accountsBoard).toBeInTheDocument()
  })
  it('should display the correct amount of AccountItem in an AccountBoard', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountsBoard = screen.getByTestId('accounts-board')
    const accountItems = screen.getAllByTestId('account-item')
    expect(accountsBoard).toBeInTheDocument()
    expect(accountItems.length).toBe(3)
  })
  it('should display the correct accountNames for each AccountItem in an AccountBoard', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountsBoard = screen.getByTestId('accounts-board')
    const accountItems = screen.getAllByTestId('account-item')
    expect(accountsBoard).toBeInTheDocument()
    for (let i = 0; i < accountItems.length; i++) {
      expect(accountItems[i]).toHaveTextContent(testAccounts[i].type)
    }
  })
  it('should display the correct accountNumber for each AccountItem in an AccountBoard', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountsBoard = screen.getByTestId('accounts-board')
    const accountItems = screen.getAllByTestId('account-item')
    expect(accountsBoard).toBeInTheDocument()
    for (let i = 0; i < accountItems.length; i++) {
      expect(accountItems[i]).toHaveTextContent(testAccounts[i].accountNumber)
    }
  })
  it('should display the correct account balances for each AccountItem in an AccountBoard', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountsBoard = screen.getByTestId('accounts-board')
    const accountItems = screen.getAllByTestId('account-item')
    expect(accountsBoard).toBeInTheDocument()
    for (let i = 0; i < accountItems.length; i++) {
      expect(accountItems[i]).toHaveTextContent(
        testAccounts[i].balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }),
      )
    }
  })
})
