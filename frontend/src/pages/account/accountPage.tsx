import AccountBoard from '@/components/account/AccountBoard'
import Spinner from '@/components/generic/Spinner'
import { useAccount } from '@/hooks'

type AccountPageProps = {
  id: string
}

export default function AccountPage({ id }: AccountPageProps) {
  const { data: account, isLoading, isError } = useAccount(id)

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <div className="p-8 text-red-500">Failed loading account details</div>
    )

  // TODO later on this will change to specifik hook, getAccountById
  // const account = accountDetails.find((acc) => acc.accountNumber === id)

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
