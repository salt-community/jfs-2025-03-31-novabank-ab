export type Applicant = {
  id: string
  createdAt: string // ISO timestamp
  updatedAt: Date
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string // Adjust as needed
  firstName: string
  lastName: string
  personalNumber: string
  email: string
  phoneNumber: string
}

export type ApplicationRequestDto = {
  firstName: string
  lastName: string
  email: string
  personalNumber: string
  phoneNumber: string
}

export type ApplicantsResponse = Applicant[]
