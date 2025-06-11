import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

import SideBar from '@/components/generic/SideBar'

export const Route = createRootRoute({
  component: () => (
    <>
    <SignedIn>
      <SideBar />
    </SignedIn>
      <Outlet />
    </>
  ),
})
