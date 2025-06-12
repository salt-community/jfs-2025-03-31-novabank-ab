import { Link } from '@tanstack/react-router'
import { AccountItem } from './'
import type { Account } from '@/types'

type AccountsBoardProps = {
  bankAccounts: Array<Account>
}

export function AccountsBoard({ bankAccounts }: AccountsBoardProps) {
  return (
    <div className="max-w mx-auto p-6 space-y-6">
      <h1 className="text-2xl">My bank accounts ({bankAccounts.length})</h1>

      <div className="space-y-3">
        {bankAccounts.map((account) => (
          <div key={account.number}>
            <Link to="/accounts/$id" params={{ id: account.number }}>
              <AccountItem account={account} />
            </Link>
          </div>
        ))}

        <button className="w-full flex items-center justify-between bg-amber-400 hover:bg-amber-500 py-3 px-4 shadow rounded-md">
          <span className="text-lg">+ Open new account</span>
          <span className="text-xl">{'>'}</span>
        </button>
      </div>
    </div>
  )
}
