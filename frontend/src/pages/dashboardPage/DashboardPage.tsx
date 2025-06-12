import TransactionList from '@/components/dashboard/TransactionList'
import AccountGallery from '@/components/dashboard/AccountGallery'

export default function DashboardPage() {
  return (
    <>
      <AccountGallery
        bankAccounts={[
          {
            name: 'Savings',
            number: '**** 2201',
            balance: 4465.23,
          },
          {
            name: 'Personal',
            number: '**** 7654',
            balance: 532.78,
          },
          {
            name: 'Family',
            number: '**** 4720',
            balance: 66004.65,
          },
        ]}
      />
      <TransactionList />
    </>
  )
}
