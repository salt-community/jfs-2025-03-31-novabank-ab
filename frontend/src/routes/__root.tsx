import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

import SideBar from '@/components/generic/SideBar'

export const Route = createRootRoute({
  component: () => (
    <>
      <SideBar />
      <div className='flex justify-center align-center text-black'><SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn></div>
      
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
