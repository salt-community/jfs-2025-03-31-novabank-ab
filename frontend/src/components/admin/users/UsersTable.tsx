import React from 'react'
import type { User } from '@/types/admin/user'

interface Props {
  users: User[]
  isUpdating: boolean
  onActivate: (id: string) => void
  onSuspend: (id: string) => void
  onViewAccounts: (user: User) => void
}

export const UsersTable: React.FC<Props> = ({
  users,
  isUpdating,
  onActivate,
  onSuspend,
  onViewAccounts,
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {['Name', 'Email', 'Status', 'Actions'].map((h) => (
            <th
              key={h}
              className="px-4 py-2 text-left text-sm font-medium text-gray-700"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t border-gray-200">
            <td className="px-4 py-2 text-sm">
              {u.firstName} {u.lastName}
            </td>
            <td className="px-4 py-2 text-sm">{u.email}</td>
            <td className="px-4 py-2 text-sm">{u.status}</td>
            <td className="px-4 py-2 text-sm space-x-1">
              <button
                onClick={() => onViewAccounts(u)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:opacity-70 transition hover:cursor-pointer disabled:opacity-50"
              >
                Accounts
              </button>
              <button
                onClick={() => onActivate(u.id)}
                disabled={isUpdating}
                className="px-2 py-1 bg-green-500 text-white rounded hover:opacity-70 transition hover:cursor-pointer disabled:opacity-50"
              >
                Activate
              </button>
              <button
                onClick={() => onSuspend(u.id)}
                disabled={isUpdating}
                className="px-2 py-1 bg-red-500 text-white rounded hover:opacity-70 transition hover:cursor-pointer disabled:opacity-50"
              >
                Suspend
              </button>
            </td>
          </tr>
        ))}
        {users.length === 0 && (
          <tr>
            <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)
