import { TransactionItem } from '../generic/'
import { ScheduledTransactionItem } from '../generic'
import type { ScheduledTransactionItemProps } from '../generic/'
import { NoTransactionItem } from '../generic/'
import type { Account, Transaction } from '@/types'
import { useNavigate } from '@tanstack/react-router'

type AccountBoardProps = {
  account: Account
}

const scheduledTransactionsMock: Array<ScheduledTransactionItemProps> = [
  {
    amount: 50,
    description: 'Test Scheduled One',
    fromAccountId: 'XXX 123',
    ocrNumber: 'OCR TEST 1',
    scheduledDate: '2025-06-16T11:45:28.624Z',
    toAccountId: 'XXX 321',
    userNote: 'Paying rent',
  },
  {
    amount: 123,
    description: 'Test Scheduled Two',
    fromAccountId: 'XXX 123',
    ocrNumber: 'OCR TEST 2',
    scheduledDate: '2025-06-23T11:45:28.624Z',
    toAccountId: 'XXX 321',
    userNote: 'Paying Netflix',
  },
]

const transactions: Array<Transaction> = [
  {
    transactionId: '1',
    description: "MOCK Domino's Pizza",
    type: 'Foodservice',
    amount: -16.3,
    date: '11:54 pm',
    fromAccount: '',
    ocrNumber: '',
    status: '',
    toAccount: '',
    userNote: '',
  },
  {
    transactionId: '2',
    description: 'MOCK YouTube Premium',
    type: 'Streaming service',
    amount: -6.0,
    date: '06:30 pm',
    fromAccount: '',
    ocrNumber: '',
    status: '',
    toAccount: '',
    userNote: '',
  },
  {
    transactionId: '3',
    description: 'MOCK Cashbox terminal #17',
    type: 'Replenishment',
    amount: 450.0,
    date: '02:02 pm',
    fromAccount: '',
    ocrNumber: '',
    status: '',
    toAccount: '',
    userNote: '',
  },
  {
    transactionId: '4',
    description: 'MOCK Mom',
    type: 'Incoming',
    amount: 300,
    date: '2025-06-12 14:23',
    fromAccount: '',
    ocrNumber: '',
    status: '',
    toAccount: '',
    userNote: '',
  },
  {
    transactionId: '5',
    description: 'MOCK Dad',
    type: 'Outgoing',
    amount: -2500,
    date: '2025-06-10 09:00',
    fromAccount: '',
    ocrNumber: '',
    status: '',
    toAccount: '',
    userNote: '',
  },
  {
    transactionId: '6',
    description: 'MOCK Joe Biden',
    type: 'Outgoing',
    amount: -4000,
    date: '2025-06-09 08:15',
    fromAccount: '',
    ocrNumber: '',
    status: '',
    toAccount: '',
    userNote: '',
  },
]

export default function AccountBoard({ account }: AccountBoardProps) {
  const navigate = useNavigate()
  return (
    <div data-testid="account-board">
      <h1 className="text-4xl mb-20">{account.type}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <p className="mt-4 text-gray-600 text2xl">Total balance</p>
          <p className="text-4xl font-bold">{account.balance}</p>
          <button
            onClick={() => navigate({ to: '/transfer' })}
            className="mt-4 cursor-pointer px-4 py-2 bg-amber-400 hover:bg-amber-500 rounded-md text-md shadow"
          >
            + New transfer
          </button>
        </div>

        <div className="border-l pl-8">
          <p className="text-md text-gray-500">Account STATUS</p>
          <p className="text-2xl ">{account.status}</p>
          <p className="mt-4 text-md text-gray-500">Account number</p>
          <p className="text-2xl ">{account.accountNumber}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Scheduled Transactions</h2>
        <div className="space-y-2">
          {scheduledTransactionsMock.length > 0 ? (
            scheduledTransactionsMock.map((st, index) => (
              <ScheduledTransactionItem
                key={index}
                amount={st.amount}
                description={st.description}
                fromAccountId={st.fromAccountId}
                ocrNumber={st.ocrNumber}
                scheduledDate={st.scheduledDate}
                toAccountId={st.toAccountId}
                userNote={st.userNote}
              />
            ))
          ) : (
            <NoTransactionItem></NoTransactionItem>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl mb-4">Transactions</h2>
        <div className="space-y-2">
          {transactions.map((t, index) => (
            <TransactionItem
              key={index}
              name={t.description}
              category={t.type}
              amount={t.amount}
              time={t.date}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
