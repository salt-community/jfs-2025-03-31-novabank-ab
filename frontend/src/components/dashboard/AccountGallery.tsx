import { Link } from '@tanstack/react-router'

const bankAccounts = [
  {
    accountName: 'Personal',
    accountNumber: 'SE3550000000054910000001',
    balance: 25600.75,
  },
  {
    accountName: 'SavingsAccount',
    accountNumber: 'SE3550000000054910000002',
    balance: 105000.5,
  },
  {
    accountName: 'Vacation',
    accountNumber: 'SE3550000000054910000003',
    balance: 7200.0,
  },
]

export default function AccountGallery() {
  return (
    <div>
      <h1>My Accounts</h1>

      <div>
        <Link to="/account/$id" params={}></Link>
      </div>
    </div>
  )
}
