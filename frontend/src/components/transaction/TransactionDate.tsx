import DatePicker from './DatePicker'

type TransactionDateProps = {
  transactionDate: string | null
  setTransactionDate: React.Dispatch<React.SetStateAction<string | null>>
  error: string | undefined
}

export default function TransactionDate({
  transactionDate,
  setTransactionDate,
  error,
}: TransactionDateProps) {
  return (
    <>
      {/* Transaction date */}
      <div className="relative w-full">
        <div className={`${error ? 'border border-red-500 rounded' : ''}`}>
          <DatePicker
            value={transactionDate}
            onDateChange={setTransactionDate}
            error={error}
          />
        </div>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    </>
  )
}
