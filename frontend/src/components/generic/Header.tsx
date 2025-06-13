import { SignInButton, SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import novabankicon from '../../assets/NovaBankTransparentLogo.png'

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
  return (
    <header className="bg-black w-full">
      <div className="flex items-center justify-between px-8">
      <img
        src={novabankicon}
        alt="Nova Bank Logo"
        className="h-30 bg-black rounded-4xl w-30 my-1"
      />
      <SignedOut>
        <SignInButton>
          <button className="text-center ml-2 mr-2 text-white hover:cursor-pointer px-4 py-1 border-2 border-white rounded-4xl">
                    Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <RedirectOnSignIn />
      </SignedIn>
      </div>
    </header>
  );
}