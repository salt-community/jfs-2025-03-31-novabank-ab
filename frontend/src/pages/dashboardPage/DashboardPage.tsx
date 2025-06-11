import TransactionList from '@/components/dashboard/TransactionList'
import AccountGallery from '@/components/dashboard/AccountGallery'
import SideBar from '@/components/generic/SideBar'

export default function DashboardPage() {
  return (
    <>
      <AccountGallery />
      <TransactionList />
    </>
  )
}
