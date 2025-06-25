import { useNavigate, useRouterState } from '@tanstack/react-router'
import {
  homeicon,
  accounticon,
  transactionicon,
  transfericon,
  settingsicon,
  yellowhomeicon,
  yellowaccounticon,
  yellowtransactionicon,
  yellowtransfericon,
  yellowsettingsicon,
  yellowloanicon,
  loanicon,
} from '@/assets/icons'

export function UserBottomNav() {
  const navigate = useNavigate()
  const { location } = useRouterState()
  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-[#151515] text-white py-3 border-t border-gray-700 md:hidden">
      <a onClick={() => navigate({ to: '/dashboard' })}>
        <img
          src={isActive('/dashboard') ? yellowhomeicon : homeicon}
          className="w-6 h-6"
        />
      </a>
      <a onClick={() => navigate({ to: '/accounts' })}>
        <img
          src={isActive('/accounts') ? yellowaccounticon : accounticon}
          className="w-6 h-6"
        />
      </a>
      <a onClick={() => navigate({ to: '/transfer' })}>
        <img
          src={isActive('/transfer') ? yellowtransfericon : transfericon}
          className="w-6 h-6"
        />
      </a>
      <a onClick={() => navigate({ to: '/transactions' })}>
        <img
          src={
            isActive('/transactions') ? yellowtransactionicon : transactionicon
          }
          className="w-6 h-6"
        />
      </a>
      <a onClick={() => navigate({ to: '/loans/register' })}>
        <img
          src={isActive('/loans/register') ? yellowloanicon : loanicon}
          className="w-6 h-6"
        />
      </a>
      <a onClick={() => navigate({ to: '/settings' })}>
        <img
          src={isActive('/settings') ? yellowsettingsicon : settingsicon}
          className="w-6 h-6"
        />
      </a>
    </nav>
  )
}
