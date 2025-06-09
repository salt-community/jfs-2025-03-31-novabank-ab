import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import SideBar from '@/components/SideBar'

export const Route = createRootRoute({
  component: () => (
    <>
      <SideBar />

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
