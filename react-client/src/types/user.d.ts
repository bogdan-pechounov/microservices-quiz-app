export type User = {
  id: string
  username: string
}

export type UserLogin = User & {
  password: string
}
