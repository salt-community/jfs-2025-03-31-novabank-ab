import { createFileRoute } from '@tanstack/react-router'
import TransferPage from '@/pages/transferPage/transferPage'

export const Route = createFileRoute('/transfer')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TransferPage
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
  )
}
