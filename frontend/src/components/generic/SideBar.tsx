import { useNavigate, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { SignOutButton } from '@clerk/clerk-react'
import {
  homeicon,
  accounticon,
  transactionicon,
  transfericon,
  settingsicon,
  signouticon,
  novabankicon,
  yellowhomeicon,
  yellowaccounticon,
  yellowtransactionicon,
  yellowtransfericon,
  yellowsettingsicon,
} from '@/assets/icons'
import UserBottomNav from './UserBottomNav'
import UserTopNav from './UserTopNav'

type Props = {
  admin: boolean
}

export default function SideBar({ admin }: Props) {
  const { t } = useTranslation('sidebar')

  const navigate = useNavigate()
  const { location } = useRouterState()
  const isActive = (path: string) => location.pathname.startsWith(path)

  const userSideBar = (
    <aside className=" w-full items-center hidden md:flex fixed h-full bg-[#151515] text-white text-xs lg:text-md xl:text-lg p-4 justify-between flex-col w-[70px] lg:w-70 transition-all duration-300">
      <a onClick={() => navigate({ to: '/' })}>
        <img
          src={novabankicon}
          className="w-10 h-10 xl:h-20 xl:w-20 mb-15  hover:cursor-pointer"
        />
      </a>

      <div className="flex gap-8 flex-col list-none  ">
        <a
          onClick={() => navigate({ to: '/dashboard' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/dashboard')
              ? 'text-[#FFB20F] hover:opacity-100 underline'
              : ''
          }`}
        >
          <img
            src={isActive('/dashboard') ? yellowhomeicon : homeicon}
            alt="Home"
          />
          <span className="hidden lg:inline">{t('user.dashboard')}</span>
        </a>

        <a
          onClick={() => navigate({ to: '/accounts' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/accounts')
              ? 'text-[#FFB20F] hover:opacity-100 underline'
              : ''
          }`}
        >
          <img src={isActive('/accounts') ? yellowaccounticon : accounticon} />
          <span className="hidden lg:inline">{t('user.accounts')}</span>
        </a>

        <a
          onClick={() => navigate({ to: '/transactions' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/transactions')
              ? 'text-[#FFB20F] hover:opacity-100 underline'
              : ''
          }`}
        >
          <img
            src={
              isActive('/transactions')
                ? yellowtransactionicon
                : transactionicon
            }
          />
          <span className="hidden lg:inline"> {t('user.transactions')}</span>
        </a>

        <a
          onClick={() => navigate({ to: '/transfer' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/transfer')
              ? 'text-[#FFB20F] hover:opacity-100 underline'
              : ''
          }`}
        >
          <img
            src={isActive('/transfer') ? yellowtransfericon : transfericon}
          />
          <span className="hidden lg:inline">{t('user.transfer')}</span>
        </a>

        <a
          onClick={() => navigate({ to: '/settings' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/settings')
              ? 'text-[#FFB20F] hover:opacity-100 underline'
              : ''
          }`}
        >
          <img
            src={isActive('/settings') ? yellowsettingsicon : settingsicon}
          />
          <span className="hidden lg:inline">{t('user.settings')}</span>
        </a>
      </div>
      <div className=" mb-10 w-[122px]  ">
        <SignOutButton>
          <a className="flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70">
            <img src={signouticon} />
            {t('signOut')}
          </a>
        </SignOutButton>
      </div>
    </aside>
  )
  const adminSideBar = (
    <aside className="w-70 fixed h-full bg-[#151515] text-white text-xs lg:text-md xl:text-lg p-10 justify-between flex flex-col">
      <a onClick={() => navigate({ to: '/' })}>
        <img
          src={novabankicon}
          className="w-10 h-10 xl:h-20 xl:w-20 mb-15  hover:cursor-pointer"
        />
      </a>

      <div className="flex gap-8 flex-col list-none ">
        <a
          onClick={() => navigate({ to: '/admin/dashboard' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/admin/dashboard')
              ? 'text-[#FFB20F] hover:opacity-100 underline'
              : ''
          }`}
        >
          <img
            src={isActive('/admin/dashboard') ? yellowhomeicon : homeicon}
            alt="Home"
          />
          {t('admin.dashboard')}
        </a>

        <a
          onClick={() => navigate({ to: '/admin/users' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/admin/users')
              ? 'text-[#FFB20F] hover:opacity-100 underline'
              : ''
          }`}
        >
          <img
            src={isActive('/admin/users') ? yellowaccounticon : accounticon}
          />
          {t('admin.users')}
        </a>

        <a
          onClick={() => navigate({ to: '/admin/transactions' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/admin/transactions')
              ? 'text-[#FFB20F] hover:opacity-100 underline'
              : ''
          }`}
        >
          <img
            src={
              isActive('/admin/transactions')
                ? yellowtransactionicon
                : transactionicon
            }
          />
          {t('admin.transactions')}
        </a>

        <a
          onClick={() => navigate({ to: '/admin/applications' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/admin/applications')
              ? 'text-[#FFB20F] hover:opacity-100 underline'
              : ''
          }`}
        >
          <img
            src={
              isActive('/admin/applications')
                ? yellowtransfericon
                : transfericon
            }
          />
          {t('admin.applications')}
        </a>
      </div>
      <div className="mb-10 w-[122px]">
        <SignOutButton>
          <a className="flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ">
            <img src={signouticon} />
            {t('signOut')}
          </a>
        </SignOutButton>
      </div>
    </aside>
  )

  return admin ? (
    adminSideBar
  ) : (
    <>
      <UserTopNav />
      {userSideBar}
      <UserBottomNav />
    </>
  )
}
