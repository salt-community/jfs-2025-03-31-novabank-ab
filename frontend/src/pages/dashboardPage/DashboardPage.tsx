import { useAccounts } from '@/hooks'
import TransactionList from '@/components/dashboard/TransactionList'
import AccountGallery from '@/components/dashboard/AccountGallery'

export default function DashboardPage() {
  const { data, isLoading, isError } = useAccounts()

  if (isLoading) return <p>Loading accounts...</p>
  if (isError || !data) return <p>Failed to load accounts</p>
  return (
    <>
      <AccountGallery bankAccounts={data} />
      <TransactionList />
    </>
  )
}
