import { Link } from '@tanstack/react-router'
import blackrightarrowicon from '../../assets/blackrightarrowicon.svg'
import AccountItem from './AccountItem'
import NewAccountModal from './NewAccountModal'
import type { Account } from '@/types'
import { useState } from 'react'
import { useCreateAccount } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

type AccountsBoardProps = {
  bankAccounts: Array<Account>
}

export function AccountsBoard({ bankAccounts }: AccountsBoardProps) {
  const { t } = useTranslation('accounts')
  const [showModal, setShowModal] = useState(false)
  const createAccount = useCreateAccount()

  const handleModalSubmit = (type: string, abbrevation: string) => {
    createAccount.mutate(
      {
        type,
        abbrevation,
      },
      {
        onSuccess: () => {
          toast.success(`${type} account created`)
          setShowModal(false)
        },
        onError: () => {
          toast.error('NO ACCOUNT CREATED')
        },
      },
    )
  }
  return (
    <div className="px-4 sm:px-8 py-6 space-y-12" data-testid="accounts-board">
      <h1 className="text-3xl mb-20">{t('myBankAccounts')}</h1>
      <div className="space-y-3">
        {bankAccounts.map((account) => (
          <div key={account.accountNumber}>
            <Link to="/accounts/$id" params={{ id: account.id }}>
              <AccountItem account={account} />
            </Link>
          </div>
        ))}
        <button
          className="mt-5 flex align-center items-center justify-between hover:cursor-pointer h-14 w-full px-5 py-2 bg-[#FFB20F] hover:bg-[#F5A700] text-black shadow-md rounded-lg transition-colors"
          onClick={() => setShowModal(true)}
        >
          <span className="">{t('openNewAccount')}</span>
          <img src={blackrightarrowicon} />
        </button>

        {showModal && (
          <NewAccountModal
            onSubmit={(type, currency) => {
              handleModalSubmit(type, currency)
              setShowModal(false)
            }}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  )
}
