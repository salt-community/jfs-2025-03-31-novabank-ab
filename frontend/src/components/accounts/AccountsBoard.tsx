import { Link } from '@tanstack/react-router'
import blackrightarrowicon from '../../assets/blackrightarrowicon.svg'
import AccountItem from './AccountItem'
import type { Account } from '@/types'

type AccountsBoardProps = {
  bankAccounts: Array<Account>
}

export function AccountsBoard({ bankAccounts }: AccountsBoardProps) {
  return (
    <div data-testid="accounts-board">
      <h1 className="text-3xl mb-10">My bank accounts</h1>
      <div className="space-y-3">
        {bankAccounts.map((account) => (
          <div key={account.accountNumber}>
            <Link to="/accounts/$id" params={{ id: account.accountNumber }}>
              <AccountItem account={account} />
            </Link>
          </div>
        ))}
        <button className=" flex justify-between border-1 border-gray-200 bg-[#FFB20F] mt-10 hover:bg-[#F5A700] text-black shadow-sm px-5 py-4 hover:cursor-pointer transition-colors w-full">
          <span>Open new account</span>
          <img src={blackrightarrowicon} />
        </button>
      </div>
    </div>
  )
}
