import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/app/store'

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return <Provider store={store}>{children}</Provider>
}
