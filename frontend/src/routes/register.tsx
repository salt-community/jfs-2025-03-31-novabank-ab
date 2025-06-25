import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { RegisterApplicationForm } from '@/components/register/RegisterApplicationForm'
import { useEffect } from 'react'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SignedIn>
        <RedirectOnSignIn />
      </SignedIn>
      <SignedOut>
        <RegisterApplicationForm />
      </SignedOut>
    </>
  )
}

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
