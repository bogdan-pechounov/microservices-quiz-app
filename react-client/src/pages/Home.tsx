import React from 'react'
import { useMeQuery } from '../redux/services/authApi'
import { useTypedSelector } from '../redux/app/hooks'

export default function Home() {
  const user = useTypedSelector((state) => state.auth.user)

  return <div>{user?.username}</div>
}
