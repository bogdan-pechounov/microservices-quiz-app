export type UserLogin = {
  username: string
  password: string
}

export type User = Omit<UserLogin, 'password'> & {
  id: string
}
