import { TransactionItem } from '../generic/'
import type { AccountDetails } from '@/types'
import { ScheduledTransactionItem } from '../generic'
import type { ScheduledTransactionItemProps } from '../generic/'

type AccountBoardProps = {
  account: AccountDetails
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

export default function AccountBoard({ account }: AccountBoardProps) {
  return (
    <div data-testid="account-board">
      <h1 className="text-4xl mb-20">{account.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <p className="mt-4 text-gray-600 text2xl">Total balance</p>
          <p className="text-4xl font-bold">{account.balance.toFixed(2)}</p>
          <button className="mt-4 px-4 py-2 bg-amber-400 hover:bg-amber-500 rounded-md text-md shadow">
            + New transfer
          </button>
        </div>

        <div className="border-l pl-8">
          <p className="text-md text-gray-500">Account holder</p>
          <p className="text-2xl ">{account.accountHolder}</p>
          <p className="mt-4 text-md text-gray-500">Account number</p>
          <p className="text-2xl ">{account.number}</p>
        </div>
      </div>

      {scheduledTransactionsMock.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Scheduled Transactions</h2>
          <div className="space-y-2">
            {scheduledTransactionsMock.map((st, index) => (
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
            ))}
          </div>
        </div>
      )}
      <div>
        <h2 className="text-2xl mb-4">Transactions</h2>
        <div className="space-y-2">
          {account.transactions.map((t, index) => (
            <TransactionItem
              key={index}
              name={t.name}
              category={t.category}
              amount={t.amount}
              time={t.time}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
