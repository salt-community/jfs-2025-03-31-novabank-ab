import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from '@tanstack/react-router'

export default function SideBar() {
  const { t } = useTranslation('sidebar')
  const navigate = useNavigate()

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
        <a
          onClick={() => navigate({ to: "/settings" })}
          className="text-white ml-5 cursor-pointer"
        >
          Settings
        </a>
        <SignOutButton />
    </aside>
  )
}
