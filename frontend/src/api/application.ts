import type {
  ApplicantsResponse,
  ApplicationRequestDto,
} from '@/types/ApplicationRequestDto'

const API = import.meta.env.VITE_BASE_URL

export async function getApplications(
  token: string,
): Promise<ApplicantsResponse> {
  const res = await fetch(`${API}admin/application`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (res.status !== 200) {
    const err = await res.json()
    throw new Error(err.message ?? `getApplications failed: ${res.status}`)
  }
  return res.json()
}

export async function approveApplication(token: string, id: string) {
  const res = await fetch(`${API}admin/application/${id}?status=APPROVED`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (res.status !== 200) {
    const err = await res.json()
    throw new Error(err.message ?? `Approve failed: ${res.status}`)
  }
}

export async function rejectApplication(token: string, id: string) {
  const res = await fetch(`${API}admin/application/${id}?status=DISAPPROVED`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (res.status !== 200) {
    const err = await res.json()
    throw new Error(err.message ?? `Reject failed: ${res.status}`)
  }
}

export async function sendRegisterApplication(
  dto: ApplicationRequestDto,
): Promise<void> {
  const res = await fetch(`${API}user/application`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
  if (res.status !== 201) {
    const err = await res.json()
    throw new Error(err.message ?? `Registration failed: ${res.status}`)
  }
}
