import { Link } from '@tanstack/react-router'
import blackrightarrowicon from '../../assets/blackrightarrowicon.svg'
import AccountItem from './AccountItem'
import NewAccountModal from './NewAccountModal'
import type { Account } from '@/types'
import { useState } from 'react'

type AccountsBoardProps = {
  bankAccounts: Array<Account>
}

export function AccountsBoard({ bankAccounts }: AccountsBoardProps) {
  const [showModal, setShowModal] = useState(false)

  const handleModalSubmit = (type: string, currency: string) => {
    console.log('Create account with:', type, currency)
    // Later: Trigger API create new account
  }
  console.log('bankAccounts:', bankAccounts)
  return (
    <div data-testid="accounts-board">
      <h1 className="text-3xl mb-10">My bank accounts</h1>
      <div className="space-y-3">
        {bankAccounts.map((account) => (
          <div key={account.id}>
            <Link to="/accounts/$id" params={{ id: account.id }}>
              <AccountItem account={account} />
            </Link>
          </div>
        ))}
        <button
          className="flex align-center items-center justify-between hover:cursor-pointer h-14 w-full px-5 py-2 bg-[#FFB20F] hover:bg-[#F5A700] text-black shadow-sm rounded transition-colors"
          onClick={() => setShowModal(true)}
        >
          <span>Open new account</span>
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
