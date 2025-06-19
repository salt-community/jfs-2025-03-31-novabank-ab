import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-react'
import Header from '@/components/generic/Header'
import SideBar from '@/components/generic/SideBar'
import { useGetUserSettings } from '@/hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { login } from '@/api'

export const Route = createRootRoute({
  component: () => {
    const { i18n } = useTranslation()
    const { location } = useRouterState()
    const isIndex = location.pathname === '/'
    const isRegister = location.pathname === '/register'
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
          <aside className="w-1/5 h-screen">
            <SideBar admin={isAdmin} />
          </aside>
          <main className="flex-1 my-20 mx-30 h-full bg-white text-black">
            <Outlet />
          </main>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col w-screen h-screen">
            {isIndex || isRegister ? (
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
