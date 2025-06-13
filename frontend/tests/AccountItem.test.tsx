import { describe, expect, it, test } from 'vitest'
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

type Account = {
  accountName: string
  accountNumber: string
  balance: number
}

type AccountItemProps = {
  account: Account
}

const testAccountItem = {
  accountName: 'Test Account Item',
  accountNumber: '**** 1803',
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
    expect(accountgallery).toHaveTextContent(testAccountItem.accountName)
  })
})
