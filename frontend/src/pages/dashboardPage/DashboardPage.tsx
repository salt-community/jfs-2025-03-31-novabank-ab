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
