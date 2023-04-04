import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/app/store'
import { ThemeProvider } from '@mui/material'
import { theme } from './mui/theme'

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  )
}
