export type UsersData = {
  users: Array<User>
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  status: string
}
