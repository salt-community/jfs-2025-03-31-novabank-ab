import { UserButton } from '@clerk/clerk-react'

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-3xl mb-10">Settings</h1>
      <UserButton />
    </>
  )
}
