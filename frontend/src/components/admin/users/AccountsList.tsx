import React from 'react'
import type { AccountDTO } from '@/types/admin/AccountDTO'

interface Props {
  accounts: AccountDTO[]
  isLoading: boolean
}

export const AccountsList: React.FC<Props> = ({ accounts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-12 flex justify-center">
        <span className="animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-[#FFB20F]" />
      </div>
    )
  }

  if (accounts.length === 0) {
    return <p className="text-gray-500">No accounts found.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      {accounts.map((acc) => (
        <div
          key={acc.id}
          className="border border-gray-200 rounded-lg p-4 shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="text-sm">
              <span className="font-medium">#</span> {acc.id}
            </p>
            <p className="text-sm">
              <span className="font-medium">Account Number:</span>{' '}
              {acc.accountNumber}
            </p>
            <p className="text-sm">
              <span className="font-medium">Balance:</span>{' '}
              {acc.balance.toFixed(2)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Type:</span> {acc.type}
            </p>
            <p className="text-sm">
              <span className="font-medium">Status:</span> {acc.status}
            </p>
            <p className="text-sm">
              <span className="font-medium">Created At:</span>{' '}
              {new Date(acc.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
