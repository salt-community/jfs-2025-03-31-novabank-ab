import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
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

export function useNotifications() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const clientRef = useRef<Client | null>(null)
  const subRef = useRef<StompSubscription | null>(null)

  const query = useQuery<Notification[], Error>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const token = await getToken()
      console.log('Fetching notifications with token:', token)
      if (!token) throw new Error('No auth token found')
      return fetchNotifications(token)
    },
    staleTime: 1000 * 60, // 1 minute
  })

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
    }
  }, [getToken, queryClient])

  return query
}
