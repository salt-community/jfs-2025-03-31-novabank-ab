import Settings from '@/components/settings/Settings'
import { useTranslation } from 'react-i18next'
// import { UserButton } from '@clerk/clerk-react'

export default function SettingsPage() {
  const { t } = useTranslation('sidebar')
  return (
    <>
      <h1 className="text-3xl mb-20">{t('user.settings')}</h1>
      <Settings></Settings>
    </>
  )
}
