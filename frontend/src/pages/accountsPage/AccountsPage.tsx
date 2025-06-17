import { AccountsBoard } from '@/components/accounts'
import { useAccounts } from '@/hooks'

export default function AccountsPage() {
  const { data: accounts = [], isLoading, isError } = useAccounts()

  if (isLoading) return (
    <div className="p-20 flex justify-center text-5xl items-center">
      <span className="animate-spin rounded-full h-30 w-30 border-t-3 border-b-3 border-[#FFB20F]"></span>
    </div>
  )

  if (isError)
    return <div className="p-8 text-red-500">Failed to load accounts</div>

  return <AccountsBoard bankAccounts={accounts} />
}
