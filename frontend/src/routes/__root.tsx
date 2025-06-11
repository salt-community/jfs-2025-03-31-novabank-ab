import { Outlet, createRootRoute } from '@tanstack/react-router'
import { SignedIn } from '@clerk/clerk-react'

import SideBar from '@/components/generic/SideBar'

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen font-lato">
      <SignedIn>
        <aside className="w-1/5 h-screen">
          <SideBar />
        </aside>
      </SignedIn>

      <main className="flex-1 mx-20 my-15 h-full bg-white text-black">
        <Outlet />
      </main>
    </div>
  ),
})
