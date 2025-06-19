import { useState } from 'react'
import {
  useUsers,
  useUpdateUserStatus,
  useUserAccounts,
} from '@/hooks/useUsers'
import { SearchBar } from './SearchBar'
import { UsersTable } from './UsersTable'
import { ReviewModal } from './ReviewModal'

export default function AdminUsersPage() {
  const { data: users = [], isLoading } = useUsers()
  const update = useUpdateUserStatus()
  const [search, setSearch] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const { data: accounts = [], isLoading: loadingAcc } = useUserAccounts(
    selectedUserId ?? '',
  )

  if (isLoading)
    return (
      <div className="p-20 flex justify-center text-5xl items-center">
        <span className="animate-spin rounded-full h-30 w-30 border-t-3 border-b-3 border-[#FFB20F]" />
      </div>
    )

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.trim().toLowerCase()),
  )

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl mb-10">Manage Users</h1>

        {/* Search control */}
        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by email…"
          />
        </div>

        {/* Users table */}
        <UsersTable
          users={filtered}
          isUpdating={update.isPending}
          onReview={(user) => setSelectedUserId(user.id)}
        />
      </div>

      {/* Review modal */}
      {selectedUserId && (
        <ReviewModal
          isOpen
          user={users.find((u) => u.id === selectedUserId) ?? null}
          accounts={accounts}
          isLoading={loadingAcc}
          isUpdating={update.isPending}
          onClose={() => setSelectedUserId(null)}
          onActivate={(id) => update.mutate({ id, action: 'activate' })}
          onSuspend={(id) => update.mutate({ id, action: 'suspend' })}
        />
      )}
    </>
  )
}
