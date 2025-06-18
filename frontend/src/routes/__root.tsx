import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import Header from '@/components/generic/Header'
import SideBar from '@/components/generic/SideBar'

export const Route = createRootRoute({
  component: () => {
    const { location } = useRouterState()
    const { user } = useUser()
    const isIndex = location.pathname === '/'
    const isAdmin = user?.publicMetadata?.role === 'admin'
    return (
      <div className="flex min-h-screen font-lato">
        <SignedIn>
          <aside className="w-1/5 h-screen">
            <SideBar admin={isAdmin} />
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
                <div className="flex justify-center mx-auto w-full text-center bg-white mt-40 text-4xl">
                  <h1 className="" style={{ fontFamily: "'Lato', sans-serif" }}>
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
