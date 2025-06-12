import TransactionList from '@/components/dashboard/TransactionList'
import AccountGallery from '@/components/dashboard/AccountGallery'

export default function DashboardPage() {
  return (
    <>
      <AccountGallery
        bankAccounts={[
          {
            accountName: 'Savings',
            accountNumber: '**** 2201',
            balance: 4465.23,
          },
          {
            accountName: 'Personal',
            accountNumber: '**** 7654',
            balance: 532.78,
          },
          {
            accountName: 'Family',
            accountNumber: '**** 4720',
            balance: 66004.65,
          },
        ]}
      />
      <TransactionList />
    </>
  )
}
