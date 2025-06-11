import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '@/pages/dashboardPage/DashboardPage'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react'
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
    <div className="flex justify-between text-black">
    <div className="flex flex-col justify-center">
        <h1 className="text-left mt-20 ml-5 underline underline-offset-6 text-4xl pb-10 pt-3 rounded-4xl" style={{ fontFamily: "'Lato', sans-serif" }}>Welcome to the future of finance - Nova Bank</h1>
        <h2 className="ml-5 text-2xl pb-5 pt-3 leading-12 rounded-4xl" style={{ fontFamily: "'Lato', sans-serif" }}>Let us take your banking to the next level<br></br>Register for free today</h2>
      </div>
      <img
        src="Manhattan.jpg"
        alt="Manhattan"
        className="w-[40%] mt-20 rounded-l-4xl"
      />
    </div>
      </>
  )
}
