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
import AccountItem from '../src/components/accounts/AccountItem'

const testAccountItem = {
  id: 'testId-123456789',
  balance: 1803.98,
  type: 'Test Account',
  createdAt: '20250616',
  status: 'Active',
  accountNumber: '**** 1818',
}

const rootRoute = new RootRoute({
  component: Outlet,
})
const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <AccountItem account={testAccountItem} />,
})
const router = createRouter({
  routeTree: rootRoute.addChildren([route]),
  history: createMemoryHistory(),
})

describe('AccountItem', () => {
  it('should render an AccountItem', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountgallery = screen.getByTestId('account-item')
    expect(accountgallery).toBeInTheDocument()
  })
  it('should display the correct accountName for an AccountItem', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountgallery = screen.getByTestId('account-item')
    expect(accountgallery).toBeInTheDocument()
    expect(accountgallery).toHaveTextContent(testAccountItem.type)
  })
  it('should display the correct accountNumber for an AccountItem', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountgallery = screen.getByTestId('account-item')
    expect(accountgallery).toBeInTheDocument()
    expect(accountgallery).toHaveTextContent(testAccountItem.accountNumber)
  })
  it('should display the correct balance for an AccountItem', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountgallery = screen.getByTestId('account-item')
    expect(accountgallery).toBeInTheDocument()
    expect(accountgallery).toHaveTextContent(
      testAccountItem.balance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      }),
    )
  })
})
