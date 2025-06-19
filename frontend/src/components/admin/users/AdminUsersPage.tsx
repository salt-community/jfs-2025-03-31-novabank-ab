import React, { useState } from 'react'
import { useUsers, useUpdateUserStatus } from '@/hooks/useUsers'
import { useUserAccounts } from '@/hooks/useUsers'
import { SearchBar } from './SearchBar'
import { UsersTable } from './UsersTable'
import { AccountsModal } from './AccountsModal'
import type { User } from '@/types/admin/user'

export default function AdminUsersPage() {
  const { data: users = [], isLoading } = useUsers()
  const update = useUpdateUserStatus()
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const { data: accounts = [], isLoading: loadingAcc } = useUserAccounts(
    selectedUser?.id || '',
  )

  if (isLoading)
    return (
      <div className="p-20 flex justify-center text-5xl items-center">
        <span className="animate-spin rounded-full h-30 w-30 border-t-3 border-b-3 border-[#FFB20F]"></span>
      </div>
    )

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
      />
    </div>
  )
}
