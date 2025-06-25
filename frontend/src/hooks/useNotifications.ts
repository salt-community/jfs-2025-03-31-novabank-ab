import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useCallback } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import type { StompSubscription } from '@stomp/stompjs'
import { useAuth } from '@clerk/clerk-react'

export interface Notification {
  id: string
  message: string
  createdAt: string
  read: boolean
}

const API = import.meta.env.VITE_BASE_URL

async function fetchNotifications(token: string): Promise<Notification[]> {
  const res = await fetch(`${API}notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message ?? `fetchNotifications failed: ${res.status}`)
  }

  return res.json()
}

async function markNotificationsAsRead(
  ids: string[],
  token: string,
): Promise<Notification[]> {
  const res = await fetch(`${API}notifications/read`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ notificationIds: ids }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(
      err.message ?? `markNotificationsAsRead failed: ${res.status}`,
    )
  }

  return res.json()
}

export function useNotifications() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const clientRef = useRef<Client | null>(null)
  const subRef = useRef<StompSubscription | null>(null)
  const markAsReadTimeout = useRef<NodeJS.Timeout | null>(null)

  const query = useQuery<Notification[], Error>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token found')
      return fetchNotifications(token)
    },
    staleTime: 1000 * 60, // 1 minute
  })

  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const token = await getToken()
      if (!token) throw new Error('No auth token')
      return markNotificationsAsRead(ids, token)
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Notification[]>(['notifications'], (old) => {
        if (!old) return []
        const updatedIds = new Set(updated.map((n) => n.id))
        return old.map((n) => (updatedIds.has(n.id) ? { ...n, read: true } : n))
      })
    },
  })

  const markAllAsRead = useCallback(() => {
    const unreadIds = query.data?.filter((n) => !n.read).map((n) => n.id) ?? []
    if (unreadIds.length > 0) {
      mutation.mutate(unreadIds)
    }
  }, [query.data, mutation])

  useEffect(() => {
    let isMounted = true

    const connect = async () => {
      const token = await getToken()
      if (!token || !isMounted) return

      const socket = new SockJS(`${API}ws-notifications`)
      const client = new Client({
        webSocketFactory: () => socket as WebSocket,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onConnect: () => {
          subRef.current = client.subscribe(
            '/user/queue/notifications',
            (msg) => {
              const payload: Notification = JSON.parse(msg.body)

              queryClient.setQueryData<Notification[]>(
                ['notifications'],
                (old) => {
                  return old ? [payload, ...old] : [payload]
                },
              )
            },
          )
        },
        onStompError: (frame) => {
          console.error('STOMP error', frame)
        },
      })

      client.activate()
      clientRef.current = client
    }

    connect()

    return () => {
      isMounted = false
      subRef.current?.unsubscribe()
      clientRef.current?.deactivate()
      if (markAsReadTimeout.current) {
        clearTimeout(markAsReadTimeout.current)
      }
    }
  }, [getToken, queryClient])

  const scheduleMarkAllAsRead = () => {
    if (markAsReadTimeout.current) {
      clearTimeout(markAsReadTimeout.current)
    }
    markAsReadTimeout.current = setTimeout(() => {
      markAllAsRead()
    }, 2000)
  }

  return {
    ...query,
    markAllAsRead,
    scheduleMarkAllAsRead,
  }
}
