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
import AccountsBoard from '../src/components/accounts/AccountsBoard'

const testAccounts = [
  {
    accountName: 'Test Account ItemOne',
    accountNumber: '**** 1803',
    balance: 1803.1998,
  },
  {
    accountName: 'Test Account ItemTwo',
    accountNumber: '**** 1804',
    balance: 1803.2099,
  },
  {
    accountName: 'Test Account ItemThree',
    accountNumber: '**** 1805',
    balance: 2222.1998,
  },
]

const rootRoute = new RootRoute({
  component: Outlet,
})
const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <AccountsBoard accounts={testAccounts} />,
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
  //   it('should display the correct accountName for an AccountItem', async () => {
  //     render(<RouterProvider router={router} />)
  //     await act(async () => {
  //       await router.navigate({ to: '/' })
  //     })
  //     const accountgallery = screen.getByTestId('account-item')
  //     expect(accountgallery).toBeInTheDocument()
  //     expect(accountgallery).toHaveTextContent(testAccountItem.accountName)
  //   })
})
