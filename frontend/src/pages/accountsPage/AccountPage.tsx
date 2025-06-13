import AccountBoard from '@/components/account/AccountBoard'

export default function AccountPage() {
  const transactions = [
    {
      name: "Domino's Pizza",
      category: 'Foodservice',
      amount: -16.3,
      time: '11:54 pm',
    },
    {
      name: 'YouTube Premium',
      category: 'Streaming service',
      amount: -6.0,
      time: '06:30 pm',
    },
    {
      name: 'Cashbox terminal #17',
      category: 'Replenishment',
      amount: 450.0,
      time: '02:02 pm',
    },
  ]
  return (
    <AccountBoard
      accountName="Savings"
      balance={1000}
      accountHolder="First Last"
      accountNumber="9382 1045 6678 2201"
      transactions={transactions}
    />
  )
}
