import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export default function SideBar() {
  const { t } = useTranslation('sidebar')

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-amber-300 text-center">
      <div className="px-2 font-bold ">
        <Link to="/">Home</Link>{/* TODO: change this to a icon maybe */}
      </div>
      <ul className="list-none content-center">
        <li>{t('dashboard')}</li>
        <li>{t("accounts")}</li>
        <li>{t("transactions")}</li>
        <li>{t("transfers")}</li>
      </ul>
      <div className="px-2 font-bold content-end">
        <Link to="/settings">{t("settings")}</Link>
      </div>
    </aside>
  )
}
