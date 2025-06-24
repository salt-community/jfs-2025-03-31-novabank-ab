import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="h-2000 flex justify-center bg-gradient-to-tr from-sky-700 to-[#FFB20F] relative">
      <SignedIn>
        <RedirectOnSignIn />
      </SignedIn>
      <SignedOut>
        <div className="mt-10">
          <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl mx-auto px-6 py-16">
            <div className="backdrop-blur-xl bg-black border border-yellow-300/80 rounded-3xl shadow-2xl p-10 md:w-1/2 animate-fade-in-up">
              <h1
                className="text-5xl font-semibold text-white mb-6 drop-shadow-lg animate-slide-in-left"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Welcome to the future of finance
                <br />
                <p className="text-[#FFB20F] mt-4 drop-shadow-lg">Nova Bank</p>
              </h1>
              <h2
                className="text-2xl text-white mb-8 drop-shadow-lg animate-fade-in"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Let us take your banking to the next level
                <br />
                Register for free today
              </h2>
              <div className="flex justify-left">
                <button
                  className=" px-8 py-3 bg-[#FFB20F] border-2 border-yellow-500/80 cursor-pointer text-black rounded-4xl hover:bg-[#F5A700]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  onClick={() => navigate({ to: '/register' })}
                >
                  Register Here
                </button>

              </div>
            </div>
            <div className="">
              <img
                src="/PhonePlaceholder.png"
                alt="Landing Page Illustration"
                className="w-full animate-fade-in-up h-120 max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </SignedOut>

      <style>
        {`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(.4,0,.2,1) both; }

          @keyframes slide-in-left {
            0% { opacity: 0; transform: translateX(-40px);}
            100% { opacity: 1; transform: translateX(0);}
          }
          .animate-slide-in-left { animation: slide-in-left 1s 0.2s cubic-bezier(.4,0,.2,1) both; }

          @keyframes fade-in {
            0% { opacity: 0;}
            100% { opacity: 1;}
          }
          .animate-fade-in { animation: fade-in 1.5s 0.5s both; }
        `}
      </style>
    </div>
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
