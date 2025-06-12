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
      <TransactionList
        transactions={[
          {
            id: 1,
            name: "Domino's Pizza",
            category: 'Foodservice',
            amount: -16.3,
            time: '11:54 pm',
          },
          {
            id: 2,
            name: 'YouTube Premium',
            category: 'Streaming service',
            amount: -6.0,
            time: '06:30 pm',
          },
          {
            id: 3,
            name: 'Cashbox terminal #17',
            category: 'Replenishment',
            amount: 450.0,
            time: '02:02 pm',
          },
        ]}
      />
    </>
  )
}
