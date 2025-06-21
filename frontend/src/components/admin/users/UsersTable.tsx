import React from 'react'
import type { User } from '@/types/admin/user'

interface Props {
  users: User[]
  isUpdating: boolean
  onReview: (user: User) => void
}

export const UsersTable: React.FC<Props> = ({
  users,
  isUpdating,
  onReview,
}) => (
  <div className="overflow-x-auto shadow-sm">
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Name
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Email
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Status
          </th>
          <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t border-gray-200">
            <td className="px-4 py-2">
              {u.firstName} {u.lastName}
            </td>
            <td className="px-4 py-2">{u.email}</td>
            <td className="px-4 py-2">{u.status}</td>
            <td className="px-4 py-2 text-center">
              <button
                onClick={() => onReview(u)}
                disabled={isUpdating}
                className="px-3 py-1 bg-[#FFB20F] text-black rounded hover:opacity-70 transition hover:cursor-pointer"
              >
                Review
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
