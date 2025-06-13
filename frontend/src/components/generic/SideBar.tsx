import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { SignOutButton } from '@clerk/clerk-react'
import homeicon from '../../assets/homeicon.svg'
import accounticon from '../../assets/accounticon.svg'
import transactionicon from '../../assets/transactionicon.svg'
import transfericon from '../../assets/transfericon.svg'
import settingsicon from '../../assets/settingsicon.svg'
import novabankicon from '../../assets/NovaBankTransparentLogo.png'

export default function SideBar() {
  const { t } = useTranslation('sidebar')

  const navigate = useNavigate()

  return (
    <aside className="w-1/5 fixed top-0 left-0 h-full bg-[#151515] text-white text-xs lg:text-sm xl:text-md p-10 justify-between flex flex-col">
      <a onClick={() => navigate({ to: '/' })}>
        <img
          src={novabankicon}
          className="w-30 h-30 mx-auto hover:cursor-pointer"
        />
      </a>

      <div className="flex gap-8 flex-col list-none mx-auto">
        <a
          onClick={() => navigate({ to: '/dashboard' })}
          className="flex flex-row gap-8 hover:cursor-pointer opacity-80 hover:opacity-100 "
        >
          <img src={homeicon} />
          {t('dashboard')}
        </a>

        <a
          onClick={() => navigate({ to: '/accounts' })}
          className="flex flex-row gap-8 hover:cursor-pointer opacity-80 hover:opacity-100 "
        >
          <img src={accounticon} />
          {t('accounts')}
        </a>

        <a
          onClick={() => navigate({ to: '/transactions' })}
          className="flex flex-row gap-8 hover:cursor-pointer opacity-80 hover:opacity-100 "
        >
          <img src={transactionicon} />
          {t('transactions')}
        </a>

        <a
          onClick={() => navigate({ to: '/transfer' })}
          className="flex flex-row gap-8 hover:cursor-pointer opacity-80 hover:opacity-100 "
        >
          <img src={transfericon} />
          {t('transfer')}
        </a>
      </div>

      <a
        onClick={() => navigate({ to: '/settings' })}
        className="flex flex-row gap-8 hover:cursor-pointer opacity-80 hover:opacity-100 mx-auto"
      >
        <img src={settingsicon} />
        {t('settings')}
      </a>
      <SignOutButton>
        <button className='hover:cursor-pointer opacity-80 hover:opacity-100 mx-auto'>
          Sign out
        </button>
      </SignOutButton>
    </aside>
  )
}
