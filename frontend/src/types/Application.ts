export type ApplicationStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'DISAPPROVED'
  | 'CANCELED'

export interface Application {
  id: string
  createdAt: string
  status: ApplicationStatus
  firstName: string
  lastName: string
  personalNumber: string
  email: string
  phoneNumber: string
  updatedAt: string
}
