import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import Header from '@/components/generic/Header'
import SideBar from '@/components/generic/SideBar'

export const Route = createRootRoute({
  component: () => {
    const { location } = useRouterState()
    const isIndex = location.pathname === '/'

    return (
      <div className="flex min-h-screen ">
        <SignedIn>
          <aside className="w-1/5 h-screen">
            <SideBar />
          </aside>
          <main className="flex-1 my-20 mx-30 h-full bg-white text-black">
            <Outlet />
          </main>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col w-screen h-screen">
            {isIndex ? (
              <>
                <Header />
                <Outlet />
              </>
            ) : (
              <>
                <Header />
                <div className="flex justify-center bg-white mt-40 text-4xl">
                  <h1 style={{ fontFamily: "'Lato', sans-serif" }}>
                    Please sign in to access this page
                  </h1>
                </div>
              </>
            )}
          </div>
        </SignedOut>
      </div>
    )
  },
})
