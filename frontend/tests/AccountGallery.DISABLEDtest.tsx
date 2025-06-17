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
import { AccountGallery } from '../src/components/dashboard/AccountGallery'

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
  component: () => <AccountGallery bankAccounts={testAccounts} />,
})
const router = createRouter({
  routeTree: rootRoute.addChildren([route]),
  history: createMemoryHistory(),
})

describe('AccountGallery', () => {
  it('should render an AccountGallery', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountgallery = screen.getByTestId('account-gallery')
    expect(accountgallery).toBeInTheDocument()
  })
  it('should render three AccountCard s', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountCards = screen.getAllByTestId('account-card')
    expect(accountCards.length).toBe(3)
  })
  it('should render correct account names for the accounts', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountCards = screen.getAllByTestId('account-card')
    for (let i = 0; i < accountCards.length; i++) {
      expect(accountCards[i]).toHaveTextContent(testAccounts[i].type)
    }
  })
  it('should render correct account numbers for the accounts', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountNumbers = screen.getAllByTestId('account-number')
    for (let i = 0; i < accountNumbers.length; i++) {
      expect(accountNumbers[i]).toHaveTextContent(testAccounts[i].accountNumber)
    }
  })
  it('should render correct balance for the accounts', async () => {
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    const accountBalances = screen.getAllByTestId('account-balance')
    for (let i = 0; i < accountBalances.length; i++) {
      expect(accountBalances[i]).toHaveTextContent(
        testAccounts[i].balance.toString(),
      )
    }
  })
})
