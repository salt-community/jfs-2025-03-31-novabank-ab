import novabankicon from '../../assets/NovaBankTransparentLogo.png'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'


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
        <UserButton />
      </SignedIn>
      </div>
    </header>
  );
}