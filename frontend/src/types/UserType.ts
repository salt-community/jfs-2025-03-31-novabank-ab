export type UserType = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export type UserUpdateType = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  role: 'USER'
  status: 'ACTIVE'
}
