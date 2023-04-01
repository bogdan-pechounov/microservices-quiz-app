export type User = {
  username: string
}

export type UserLogin = User & {
  password: string
}
