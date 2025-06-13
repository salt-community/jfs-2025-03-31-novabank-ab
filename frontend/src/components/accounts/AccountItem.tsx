import { useNavigate } from '@tanstack/react-router';
import type { Account } from '@/types';

type AccountItemProps = {
  account: Account
};

export default function AccountItem({
  account
}: AccountItemProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between border px-4 py-3 shadow-sm hover:bg-gray-200 rounded-md cursor-pointer"
      onClick={() =>
        navigate({
          to: '/accounts/$id',
          params: { id: account.number },
        })
      }
    >
      <div>
        <div>{account.name}</div>
        <div className="text-sm text-gray-500">{account.number}</div>
      </div>
      <div className="text-right">
        ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        <span className="ml-2">{'>'}</span>
      </div>
    </div>
  );
}
