import { AdminTransactionsTable } from '@/components/admin/TransactionsTable'
import { useAdminTransactions } from '@/hooks/useAdminTransactions'

export default function AdminTransactions() {
  const { data, error, isLoading } = useAdminTransactions()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>
  }
  if (!data) {
    return <div>No data found.</div>
  }
  return (
    <div>
      <AdminTransactionsTable data={data} />
    </div>
  )
}
