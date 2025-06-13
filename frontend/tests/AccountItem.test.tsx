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
  name: 'Test Account Item',
  number: '**** 1803',
  balance: 1803.1998,
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
    expect(accountgallery).toHaveTextContent(testAccountItem.name)
  })
  it('should display the correct accountNumber for an AccountItem', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountgallery = screen.getByTestId('account-item')
    expect(accountgallery).toBeInTheDocument()
    expect(accountgallery).toHaveTextContent(testAccountItem.number)
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
