import { useNavigate } from "@tanstack/react-router";
import TransactionItem from "../generic/TransactionItem";

type Transaction={
  id: number;
  name: string;
  category: string;
  amount: number;
  time: string;
}
type TransactionListProps={
  transactions: Array<Transaction>;
}


export default function TransactionList({transactions}: TransactionListProps) {
  const navigate = useNavigate()

  return (
    <div className="p-10 rounded-lg max-w mx-auto"> 
      <div className="flex justify-between items-center"> 
        <h2 className="text-xl text-gray-800 pb-5">Recent transactions</h2>
        <a onClick={() => navigate({ to: '/transactions' })} className="text-sm text-gray-600 hover:text-gray-900 hover:cursor-pointer">See all</a>
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