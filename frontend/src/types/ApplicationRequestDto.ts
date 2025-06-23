type Applicant = {
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

export type ApplicantsResponse = Applicant[]
