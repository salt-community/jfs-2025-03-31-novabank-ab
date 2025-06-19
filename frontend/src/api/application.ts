import type { Application } from '@/types/Application'
import type { ApplicationRequestDto } from '@/types/ApplicationRequestDto'

const API = import.meta.env.VITE_BASE_URL

export async function getApplications(token: string): Promise<Application[]> {
  const res = await fetch(`${API}admin/application`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  // const res = await fetch('/mocks/applications.json', {
  //   method: 'GET',
  // })
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  return await res.json()
}

export async function approveApplication(token: string, id: string) {
  const res = await fetch(`${API}admin/application/${id}?status=APPROVED`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Approve failed: ${res.status}`)
}

export async function rejectApplication(token: string, id: string) {
  const res = await fetch(`${API}admin/application/${id}?status=DISAPPROVED`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Reject failed: ${res.status}`)
}

export async function sendRegisterApplication(
  dto: ApplicationRequestDto,
): Promise<void> {
  const res = await fetch(`${API}user/application`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
  if (res.status !== 201) throw new Error(`Registration failed: ${res.status}`)
}
