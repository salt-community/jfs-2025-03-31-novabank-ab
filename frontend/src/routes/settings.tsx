import { createFileRoute } from '@tanstack/react-router'
import SettingsPage from '@/pages/settingsPage/SettingsPage'

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <SettingsPage />
  )
}
