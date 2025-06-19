import React, { useState } from 'react'
import { useUsers, useUpdateUserStatus } from '@/hooks/useUsers'
import { useUserAccounts } from '@/hooks/useUsers'
import { SearchBar } from './SearchBar'
import { UsersTable } from './UsersTable'
import { AccountsModal } from './AccountsModal'
import type { User } from '@/types/admin/user'

export default function AdminUsersPage() {
  const { data: users = [], isLoading, isError, error } = useUsers()
  const update = useUpdateUserStatus()
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const {
    data: accounts = [],
    isLoading: loadingAcc,
    error: accError,
  } = useUserAccounts(selectedUser?.id || '')

  if (isLoading) return <p className="p-4 text-center">Loading users…</p>
  if (isError)
    return <p className="p-4 text-center text-red-600">{error.message}</p>

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.trim().toLowerCase()),
  )

  const handleActivate = (id: string) =>
    update.mutate({ id, action: 'activate' })
  const handleSuspend = (id: string) => update.mutate({ id, action: 'suspend' })
  const handleViewAccounts = (user: User) => setSelectedUser(user)

  const handleCloseModal = () => setSelectedUser(null)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Manage Users</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by email…"
      />

      {update.isError && (
        <p className="text-red-600">Error: {update.error?.message}</p>
      )}

      <UsersTable
        users={filtered}
        isUpdating={update.isPending}
        onActivate={handleActivate}
        onSuspend={handleSuspend}
        onViewAccounts={handleViewAccounts}
      />

      <AccountsModal
        isOpen={Boolean(selectedUser)}
        onClose={handleCloseModal}
        accounts={accounts}
        isLoading={loadingAcc}
        error={accError ?? undefined}
      />
    </div>
  )
}
