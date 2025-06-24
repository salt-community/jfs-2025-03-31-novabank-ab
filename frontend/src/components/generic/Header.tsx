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
      <div className="flex items-center justify-between pl-6">
        <img
          src={novabankicon}
          onClick={() => navigate({ to: '/' })}
          alt="Nova Bank Logo"
          className="h-20 bg-black rounded-4xl hover:cursor-pointer w-20"
        />
        <div className="flex items-center ml-auto">
          <button
            onClick={() => navigate({ to: '/loans' })}
            className="flex justify-center items-center px-2 gap-2 w-30 h-20 text-white hover:cursor-pointer underline-offset-5 hover:text-black hover:bg-[#fab123] hover:opacity-100"
          >
            {t('loans')}
          </button>
          <button
            onClick={() => navigate({ to: '/register' })}
            className="flex justify-center items-center px-2 gap-2 w-30 h-20 text-white hover:cursor-pointer underline-offset-5 hover:text-black hover:bg-[#fab123] hover:opacity-100"
          >
            {t('register')}
          </button>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex justify-center items-center px-2 gap-2 w-30 h-20 bg-[#fab123] text-black hover:cursor-pointer underline-offset-5 hover:bg-[#F5A700] hover:opacity-100">
                {t('signIn')}
                <img src={loginiconblack} />
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
