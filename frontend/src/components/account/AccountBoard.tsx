import TransactionItem from "../generic/TransactionItem";

type Transaction = {
  name: string;
  category: string;
  amount: number;
  time: string;
};

type AccountBoardProps = {
  accountName: string;
  balance: number;
  accountHolder: string;
  accountNumber: string;
  transactions: Array<Transaction>;
};

export default function AccountBoard({
  accountName,
  balance,
  accountHolder,
  accountNumber,
  transactions,
}: AccountBoardProps) {
  return (
    <div className="max-w mx-auto px-6 py-10 space-y-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-semibold">{accountName}</h1>
          <p className="mt-4 text-gray-600">Total balance</p>
          <p className="text-4xl font-bold">{balance.toFixed(2)}</p>
          <button className="mt-4 px-4 py-2 bg-amber-400 hover:bg-amber-500 rounded-md text-sm shadow">
            + New transfer
          </button>
        </div>

        <div className="border-l pl-8">
          <p className="text-sm text-gray-500">Account holder</p>
          <p className="text-lg ">{accountHolder}</p>
          <p className="mt-4 text-sm text-gray-500">Account number</p>
          <p className="text-lg ">{accountNumber}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg mb-4">Transactions</h2>

        <div className="space-y-2">
          {transactions.map((t, index) => (
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
  );
}
