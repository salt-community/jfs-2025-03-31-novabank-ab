import TransactionItem from "../generic/TransactionItem";

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
    <div className="p-10 rounded-lg max-w-xl mx-auto"> 
      <div className="flex justify-between items-center p-10"> 
        <h2 className="text-xl text-gray-800">Recent transactions</h2>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">See all</a>
      </div>

      <div className="shadow-md p-1">
        {transactions.map((transaction) => (
          <TransactionItem 
          key={transaction.id}
          name={transaction.name}
          category={transaction.category}
          amount={transaction.amount}
          time={transaction.time}
          />
        ))}
      </div>
    </div>
  );
}