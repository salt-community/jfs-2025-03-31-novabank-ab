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
import AccountGallery from '../src/components/dashboard/AccountGallery'

const testAccounts = [
  {
    accountName: 'Savings',
    accountNumber: '**** 2201',
    balance: 4465.23,
  },
  {
    accountName: 'Personal',
    accountNumber: '**** 7654',
    balance: 532.78,
  },
  {
    accountName: 'Family',
    accountNumber: '**** 4720',
    balance: 66004.65,
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
})
