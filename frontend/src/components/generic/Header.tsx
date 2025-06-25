import { SignInButton, SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import loginiconblack from '../../assets/loginiconblack.svg'
import novabankicon from '../../assets/NovaBankTransparentLogo.png'
import { useTranslation } from 'react-i18next'

function RedirectOnSignIn() {
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate({ to: '/dashboard' })
    }
  }, [user, navigate])

  return null
}

export function Header() {
  const { t } = useTranslation('sidebar')
  const navigate = useNavigate()
  return (
    <header className="bg-black w-full">
      <div className="flex items-center justify-between px-2 sm:px-0 sm:pl-6 h-auto sm:h-20">
        <img
          src={novabankicon}
          onClick={() => navigate({ to: '/' })}
          alt="Nova Bank Logo"
          className="h-14 w-14 sm:h-20 sm:w-20 bg-black rounded-4xl hover:cursor-pointer"
        />
        <div className="flex items-center ml-auto gap-2 sm:gap-0">
          <button
            onClick={() => navigate({ to: '/loans' })}
            className="flex justify-center items-center px-3 py-2 sm:px-2 gap-2 h-10 sm:h-20 text-sm sm:text-base w-auto sm:w-30 text-white bg-transparent rounded-md sm:rounded-none hover:cursor-pointer hover:text-black hover:bg-[#fab123] hover:opacity-100"
          >
            {t('loans')}
          </button>
          <button
            onClick={() => navigate({ to: '/register' })}
            className="flex justify-center items-center px-3 py-2 sm:px-2 gap-2 h-10 sm:h-20 text-sm sm:text-base w-auto sm:w-30 text-white bg-transparent rounded-md sm:rounded-none hover:cursor-pointer hover:text-black hover:bg-[#fab123] hover:opacity-100"
          >
            {t('register')}
          </button>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex justify-center items-center px-3 py-2 sm:px-2 gap-2 h-10 sm:h-20 text-sm sm:text-base w-auto sm:w-30 bg-[#fab123] text-black rounded-md sm:rounded-none hover:cursor-pointer hover:bg-[#F5A700] hover:opacity-100">
                {t('signIn')}
                <img src={loginiconblack} className="h-4 sm:h-5" />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <RedirectOnSignIn />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
