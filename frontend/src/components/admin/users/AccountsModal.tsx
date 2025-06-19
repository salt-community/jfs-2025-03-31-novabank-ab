import React from 'react'
import type { AccountDTO } from '@/types/admin/AccountDTO'

interface Props {
  isOpen: boolean
  onClose: () => void
  accounts: AccountDTO[]
  isLoading: boolean
  error?: Error
}

export const AccountsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  accounts,
  isLoading,
  error,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
        {isLoading ? (
          <p>Loading accounts…</p>
        ) : error ? (
          <p className="text-red-600">Error: {error.message}</p>
        ) : accounts.length === 0 ? (
          <p className="text-gray-500">No accounts found.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Account #', 'Balance', 'Type', 'Status', 'Created'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-sm font-medium text-gray-700"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => (
                <tr key={acc.id} className="border-t">
                  <td className="px-3 py-2 text-sm">{acc.accountNumber}</td>
                  <td className="px-3 py-2 text-sm">
                    {acc.balance.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-sm">{acc.type}</td>
                  <td className="px-3 py-2 text-sm">{acc.status}</td>
                  <td className="px-3 py-2 text-sm">
                    {new Date(acc.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:opacity-70 transition hover:cursor-pointer disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
