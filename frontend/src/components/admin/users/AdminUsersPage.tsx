import { useState } from 'react'
import { useUsers, useUpdateUserStatus } from '@/hooks/useUsers'
// import type { User } from '@/types/User'

export default function AdminUsersPage() {
  const { data: users = [], isLoading, isError, error } = useUsers()
  const update = useUpdateUserStatus()
  const [search, setSearch] = useState('')

  if (isLoading) return <p className="p-4 text-center">Loading users…</p>
  if (isError)
    return <p className="p-4 text-center text-red-600">{error.message}</p>

  const filtered = users.filter((u) => u.email.includes(search.trim()))

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>

      <div className="mb-6 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
        />
      </div>

      {update.isError && (
        <p className="mb-4 text-red-600">Error: {update.error?.message}</p>
      )}
      {update.isSuccess && (
        <p className="mb-4 text-green-600">Status updated successfully!</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name', 'Email', 'Phone', 'Actions'].map((h) => (
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
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-800">
                  {u.firstName} {u.lastName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{u.email}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {u.phoneNumber}
                </td>
                <td className="px-4 py-2 text-sm text-center space-x-1">
                  <button
                    onClick={() =>
                      update.mutate({ id: u.id, action: 'activate' })
                    }
                    disabled={update.isPending}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() =>
                      update.mutate({ id: u.id, action: 'suspend' })
                    }
                    disabled={update.isPending}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
