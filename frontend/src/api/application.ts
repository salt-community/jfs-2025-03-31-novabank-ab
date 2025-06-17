import type { Application } from '@/types/Application'

const API = import.meta.env.VITE_API_URL

export async function getApplications(token: string): Promise<Application[]> {
  //   const res = await fetch(`${API}/api/admin/application`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  const res = await fetch('/mocks/applications.json', {
    method: 'GET',
  })
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  return res.json()
}

export async function approveApplication(token: string, id: string) {
  const res = await fetch(
    `${API}/api/admin/application/${id}?status=APPROVED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )
  if (!res.ok) throw new Error(`Approve failed: ${res.status}`)
}

export async function rejectApplication(token: string, id: string) {
  const res = await fetch(
    `${API}/api/admin/application/${id}?status=REJECTED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )
  if (!res.ok) throw new Error(`Reject failed: ${res.status}`)
}
