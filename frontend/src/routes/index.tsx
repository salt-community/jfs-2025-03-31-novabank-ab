import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { SignInButton, SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import Header from '@/components/generic/Header'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

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

function LandingPage() {
  return (
    <>
    <Header />
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500 text-white text-[calc(10px+2vmin)]">
      <h1>Welcome to the Landing Page!</h1>
      <p>Please sign in to continue.</p>
      <div className="mx-auto mt-30 mb-25 flex justify-center items-center ">
        <SignedOut>
          <SignInButton>
            <button className="text-center ml-2 bg-black mr-2 text-white hover:cursor-pointer px-4 pb-1 border-2 border-white rounded-2xl">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <RedirectOnSignIn />
        </SignedIn>
      </div>
    </div>
          
      </>
  )
}
