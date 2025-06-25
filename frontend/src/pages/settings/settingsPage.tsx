import Settings from '@/components/settings/Settings'
import { useTranslation } from 'react-i18next'

export default function SettingsPage() {
  const { t } = useTranslation('sidebar')
  return (
    <>
      <div className="px-4 sm:px-8 py-6 space-y-12">
        <h1 className="text-3xl mb-8 sm:mb-15">{t('user.settings')}</h1>
        <Settings />
      </div>
    </>
  )
}
