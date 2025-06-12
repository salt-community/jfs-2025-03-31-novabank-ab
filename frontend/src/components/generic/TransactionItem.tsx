type TransactionItemProps = {
  name: string;
  category: string;
  amount: number;
  time: string;
};

export default function TransactionItem({ name, category, amount, time }: TransactionItemProps) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <div className="flex flex-col">
        <span className="text-base text-gray-800">{name}</span>
        <span className="text-xs text-gray-500">{category}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-base font-medium ${amount < 0 ? 'text-gray-800' : 'text-green-500'}`}>
          {amount < 0 ? `-${Math.abs(amount).toFixed(2)}` : `+${amount.toFixed(2)}`}
        </span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );
}
