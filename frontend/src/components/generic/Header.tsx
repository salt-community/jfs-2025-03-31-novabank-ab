import { SignInButton, SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import signinicon from '../../assets/signinicon.svg'
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

export default function Header() {
  const { t } = useTranslation('sidebar')
  const navigate = useNavigate()
  return (
    <header className="bg-black w-full">
      <div className="flex items-center justify-between px-6">
        <img
          src={novabankicon}
          onClick={() => navigate({ to: '/' })}
          alt="Nova Bank Logo"
          className="h-20 bg-black rounded-4xl hover:cursor-pointer w-20"
        />
        <SignedOut>
          <SignInButton mode="modal">
            <button className="flex justify-center items-center px-2 gap-2 w-30 h-20 bg-[#FFB20F] text-white hover:cursor-pointer underline-offset-5 hover:bg-[#F5A700] hover:opacity-100">
              {t('signIn')}
              <img src={signinicon} />
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <RedirectOnSignIn />
        </SignedIn>
      </div>
    </header>
  )
}
