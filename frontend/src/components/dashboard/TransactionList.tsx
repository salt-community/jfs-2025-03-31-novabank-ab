export default function TransactionList() {
  // MockData
  const transactions = [
    {
      id: 1,
      name: "Domino's Pizza",
      category: "Foodservice",
      amount: -16.30,
      time: "11:54 pm"
    },
    {
      id: 2,
      name: "YouTube Premium",
      category: "Streaming service",
      amount: -6.00,
      time: "06:30 pm"
    },
    {
      id: 3,
      name: "Cashbox terminal #17",
      category: "Replenishment",
      amount: 450.00,
      time: "02:02 pm"
    },
  ];

  return (
    <div className="p-10 rounded-lg max-w-md mx-auto"> 
      <div className="flex justify-between items-center p-10"> 
        <h2 className="text-xl text-gray-800">Recent transactions</h2>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">See all</a>
      </div>

      <div className="shadow-md p-1">
        {transactions.map(transaction => (
          <div key={transaction.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
            <div className="flex flex-col">
              <span className="text-base text-gray-800">{transaction.name}</span>
              <span className="text-xs text-gray-500">{transaction.category}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-base font-medium ${transaction.amount < 0 ? 'text-gray-800' : 'text-green-500'}`}>
                {transaction.amount < 0 ? `-${Math.abs(transaction.amount).toFixed(2)}` : `+${transaction.amount.toFixed(2)}`}
              </span>
              <span className="text-xs text-gray-400">{transaction.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}