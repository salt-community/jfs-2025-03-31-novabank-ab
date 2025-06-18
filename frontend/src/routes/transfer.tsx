import { createFileRoute } from '@tanstack/react-router'
import TransferPage from '@/pages/transfer/transferPage'

export const Route = createFileRoute('/transfer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TransferPage />
}
