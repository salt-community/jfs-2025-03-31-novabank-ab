import DatePicker from './DatePicker'

type TransferDateProps = {
  transferDate: string | null
  setTransferDate: React.Dispatch<React.SetStateAction<string | null>>
  error: string | undefined
}

export default function TransferDate({
  transferDate,
  setTransferDate,
  error,
}: TransferDateProps) {
  return (
    <>
      {/* Transfer date */}
      <div className="relative w-full">
        <div className={`${error ? 'border border-red-500 rounded' : ''}`}>
          <DatePicker
            value={transferDate}
            onDateChange={setTransferDate}
            error={error}
          />
        </div>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    </>
  )
}
