import type { ListLoanResponseDto } from '@/types/loan/LoanResponseDto'
import type { LoanResponseDto } from '@/types/loan/LoanResponseDto'
import type { LoanApplicationRequestDto } from '@/types/loan/LoanApplicationRequestDto'

const BASE = import.meta.env.VITE_BASE_URL + 'loan/'

export async function getAllLoans(token: string): Promise<LoanResponseDto[]> {
  const res = await fetch(`${BASE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!res.ok) throw new Error(`Fetch loans failed: ${res.status}`)
  const body = (await res.json()) as ListLoanResponseDto
  return body.loans
}

export async function getLoan(
  token: string,
  loanId: string,
): Promise<LoanResponseDto> {
  const res = await fetch(`${BASE}${loanId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Fetch loan ${loanId} failed: ${res.status}`)
  return res.json()
}

export async function updateLoanStatus(
  token: string,
  loanId: string,
  status: string,
): Promise<LoanResponseDto> {
  const res = await fetch(
    `${BASE}${loanId}/status?status=${encodeURIComponent(status)}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )
  if (!res.ok) throw new Error(`Updating status failed: ${res.status}`)
  return res.json()
}

export async function createLoanFromApplication(
  token: string,
  applicationId: string,
): Promise<void> {
  const res = await fetch(`${BASE}${applicationId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Create loan failed: ${res.status}`)
}

export async function createLoanApplication(
  token: string,
  dto: LoanApplicationRequestDto,
): Promise<void> {
  const res = await fetch(`${BASE}application`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  })
  console.log('Creating loan application', dto)
  console.log(res)
  if (!res.ok) throw new Error(`Create application failed: ${res.status}`)
}

export async function getLoanApplication(
  token: string,
  applicationId: string,
): Promise<unknown> {
  const res = await fetch(`${BASE}application/${applicationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Fetch application failed: ${res.status}`)
  return res.json()
}
