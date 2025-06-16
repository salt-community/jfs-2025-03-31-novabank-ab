import { useNavigate, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { SignOutButton } from '@clerk/clerk-react'
import homeicon from '../../assets/homeicon.svg'
import accounticon from '../../assets/accounticon.svg'
import transactionicon from '../../assets/transactionicon.svg'
import transfericon from '../../assets/transfericon.svg'
import settingsicon from '../../assets/settingsicon.svg'
import novabankicon from '../../assets/NovaBankTransparentLogo.png'
import signouticon from '../../assets/signouticon.svg'

export default function SideBar() {
  const { t } = useTranslation('sidebar')
  const navigate = useNavigate()
  const { location } = useRouterState()
  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <aside className="w-70 fixed h-full bg-[#151515] text-white text-xs lg:text-md xl:text-lg p-10 justify-between flex flex-col">
      <a onClick={() => navigate({ to: '/' })}>
        <img
          src={novabankicon}
          className="w-10 h-10 xl:h-20 xl:w-20 mb-15 mx-auto hover:cursor-pointer"
        />
      </a>

      <div className="flex gap-8 flex-col list-none mx-auto">
        <a
          onClick={() => navigate({ to: '/dashboard' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/dashboard')
              ? 'text-[#FFB20F] hover:opacity-100'
              : ''
          }`}
        >
          <img src={homeicon} />
          {t('dashboard')}
        </a>

        <a
          onClick={() => navigate({ to: '/accounts' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/accounts')
              ? 'text-[#FFB20F] hover:opacity-100'
              : ''
          }`}
        >
          <img src={accounticon} />
          {t('accounts')}
        </a>

        <a
          onClick={() => navigate({ to: '/transactions' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/transactions')
              ? 'text-[#FFB20F] hover:opacity-100'
              : ''
          }`}
        >
          <img src={transactionicon} />
          {t('transactions')}
        </a>

        <a
          onClick={() => navigate({ to: '/transfer' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/transfer')
              ? 'text-[#FFB20F] hover:opacity-100'
              : ''
          }`}
        >
          <img src={transfericon} />
          {t('transfer')}
        </a>

        <a
          onClick={() => navigate({ to: '/settings' })}
          className={`flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 ${
            isActive('/settings')
              ? 'text-[#FFB20F] hover:opacity-100'
              : ''
          }`}
        >
          <img src={settingsicon} />
          {t('settings')}
        </a>
        <div className="mt-30">
          <SignOutButton>
            <a className="flex flex-row gap-8 hover:cursor-pointer underline-offset-5 opacity-100 hover:opacity-70 mx-auto">
              <img src={signouticon} />
              Sign out
            </a>
          </SignOutButton>
        </div>
      </div>
    </aside>
  )
}
