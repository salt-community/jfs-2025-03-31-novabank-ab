import { useNavigate } from '@tanstack/react-router'
import { SignOutButton } from '@clerk/clerk-react'
import { novabankicon, signouticon } from '@/assets/icons'

export default function UserMobileHeader() {
  const navigate = useNavigate()

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#151515] text-white px-4 py-3 border-b border-gray-700 shadow-sm">
      <div className="relative flex items-center justify-center">
        <img
          src={novabankicon}
          alt="NovaBank logo"
          className="w-10 h-10 hover:cursor-pointer"
          onClick={() => navigate({ to: '/' })}
        />

        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <SignOutButton>
            <a className="flex items-center gap-2 text-sm text-white hover:opacity-80">
              <img src={signouticon} className="w-6 h-6" />
            </a>
          </SignOutButton>
        </div>
      </div>
    </header>
  )
}
