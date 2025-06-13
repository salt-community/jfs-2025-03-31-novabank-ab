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
  )
}
