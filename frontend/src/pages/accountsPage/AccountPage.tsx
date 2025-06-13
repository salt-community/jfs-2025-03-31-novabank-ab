import AccountBoard from '@/components/account/AccountBoard'
import { useAccountDetails } from '@/hooks'

type AccountPageProps = {
  id: string
}

export default function AccountPage({ id }: AccountPageProps) {
  const { data: accountDetails = [], isLoading, isError } = useAccountDetails()

  if (isLoading) return <div className="p-8">Loading account details...</div>
  if (isError)
    return (
      <div className="p-8 text-red-500">Failed loading account details</div>
    )

  const account = accountDetails.find((acc) => acc.number === id)

  // TODO is this really how we gonna handle this?
  if (account === undefined) {
    return (
      <div className="p-8 text-red-500">
        Could not find specific account number
      </div>
    )
  }

  return <AccountBoard account={account} />
}
