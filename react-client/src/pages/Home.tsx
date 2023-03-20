import React from 'react'
import { useMeQuery } from '../redux/services/authApi'

export default function Home() {
  const { data } = useMeQuery()
  console.log(data)
  return <div>{data?.username}</div>
}
