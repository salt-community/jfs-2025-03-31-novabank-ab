export function NoTransactionItem() {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">
          No scheduled transactions found
        </span>
      </div>
    </div>
  )
}
