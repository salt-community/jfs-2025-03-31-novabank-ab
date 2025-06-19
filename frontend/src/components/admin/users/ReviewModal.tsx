import React from 'react'
import type { User } from '@/types/admin/user'
import type { AccountDTO } from '@/types/admin/AccountDTO'
import { AccountsList } from './AccountsList'

interface Props {
  isOpen: boolean
  user: User | null
  accounts: AccountDTO[]
  isLoading: boolean
  isUpdating: boolean
  onClose: () => void
  onActivate: (id: string) => void
  onSuspend: (id: string) => void
}

export const ReviewModal: React.FC<Props> = ({
  isOpen,
  user,
  accounts,
  isLoading,
  isUpdating,
  onClose,
  onActivate,
  onSuspend,
}) => {
  if (!isOpen || !user) return null

  const isActive = user.status === 'ACTIVE'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
      <div
        className="
          bg-white
          rounded-lg
          shadow-lg
          w-full
          max-w-lg
          p-6
          max-h-[80vh]
          overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Review {user.firstName} {user.lastName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="mb-4 space-y-1 text-sm">
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {user.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Status:</span>{' '}
            <span className={isActive ? 'text-green-600' : 'text-red-600'}>
              {user.status}
            </span>
          </p>
        </div>

        {/* Activate / Suspend */}
        <div className="mb-6">
          <button
            onClick={() =>
              isActive ? onSuspend(user.id) : onActivate(user.id)
            }
            disabled={isUpdating}
            className={`
              px-4 py-2
              rounded
              text-white
              transition
              disabled:opacity-50
              hover:cursor-pointer
              ${isActive ? 'bg-red-500 hover:opacity-70' : 'bg-green-500 hover:opacity-70'}
            `}
          >
            {isActive ? 'Suspend' : 'Activate'}
          </button>
        </div>

        {/* Accounts */}
        <p className="py-2 text-md text-gray-500">
          Accounts for {user.firstName} {user.lastName}:
        </p>
        <AccountsList accounts={accounts} isLoading={isLoading} />

        {/* Footer */}
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:opacity-70 transition hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
