import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-react'
import { useGetUserSettings } from '@/hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { login } from '@/api'
import {
  Header,
  SideBar,
  UserBottomNav,
  UserTopNav,
} from '@/components/generic'

export const Route = createRootRoute({
  component: () => {
    const { i18n } = useTranslation()
    const { location } = useRouterState()
    const isIndex = location.pathname === '/'
    const isRegister = location.pathname === '/register'
    const isLoans = location.pathname === '/loans'
    const { user, isLoaded: isUserLoaded, isSignedIn } = useUser()
    const { signOut, getToken } = useAuth()
    const isAdmin = user?.publicMetadata?.role === 'admin'
    const {
      data: userSettingsFromApi,
      // isLoading: userSettingsLoading,
      // isError: userSettingsError,
    } = useGetUserSettings()

    useEffect(() => {
      if (userSettingsFromApi) {
        if (userSettingsFromApi.language === 'en') {
          i18n.changeLanguage('en')
        } else {
          i18n.changeLanguage('sv')
        }
      }
    }, [userSettingsFromApi])

    useEffect(() => {
      const doLogin = async () => {
        if (!isUserLoaded) return

        if (!isSignedIn || !user) return

        const token = await getToken()
        if (!token) {
          console.error('No token found; signing out.')
          await signOut()
          return
        }

        const success = await login(token)
        if (!success) {
          console.error('Login failed; signing out.') //Need a Toast probably
          setTimeout(async () => {
            await signOut()
          }, 2000)
        }
      }

      doLogin()
    }, [isUserLoaded, isSignedIn, user, getToken, signOut])
    return (
      <div className="flex min-h-screen font-lato">
        <SignedIn>
          {!isAdmin && (
            <>
              <div className="md:hidden fixed top-0 left-0 right-0 h-[60px] z-50">
                <UserTopNav />
              </div>
              <div className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] z-50">
                <UserBottomNav />
              </div>
            </>
          )}

          <div className="hidden md:flex">
            <aside className="w-[70px] lg:w-70 h-screen">
              <SideBar admin={isAdmin} />
            </aside>
          </div>
          <main className="flex-1 mx-[20px] md:mx-[30px] lg:mx-[100px] xl:mx-[150px] 2xl:mx-[200px] text-black">
            <Outlet />
          </main>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col w-screen h-screen">
            {isIndex || isRegister || isLoans ? (
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
