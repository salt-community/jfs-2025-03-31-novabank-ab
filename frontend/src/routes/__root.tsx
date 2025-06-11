import { Outlet, createRootRoute } from '@tanstack/react-router'
import {SignedIn} from '@clerk/clerk-react'

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
