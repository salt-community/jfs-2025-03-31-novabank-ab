import { useState } from 'react'
import { Bell, Circle } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    data: notifications = [],
    isLoading,
    error,
    refetch,
    scheduleMarkAllAsRead,
  } = useNotifications()

  const unreadCount = notifications.filter((n) => !n.read).length

  const toggleDropdown = () => {
    if (!isOpen) {
      refetch()
      scheduleMarkAllAsRead()
    }
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none hover:cursor-pointer"
        aria-label="Notifications"
      >
        <Bell size={24} className="hover:opacity-50" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1 max-h-60 overflow-auto">
            {isLoading && (
              <div className="px-4 py-2 text-gray-500">Loading...</div>
            )}
            {error && (
              <div className="px-4 py-2 text-red-500">Failed to load</div>
            )}
            {notifications.length > 0
              ? notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-2 hover:bg-gray-100 ${
                      n.read ? '' : 'font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {!n.read && (
                        <Circle size={8} className="text-red-500" fill="red" />
                      )}
                      <div>{n.message}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              : !isLoading &&
                !error && (
                  <div className="px-4 py-2 text-gray-500">
                    No notifications
                  </div>
                )}
          </div>
        </div>
      )}
    </div>
  )
}
