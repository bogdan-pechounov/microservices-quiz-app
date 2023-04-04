import { ThemeOptions, createTheme } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#79ce2f',
    },
    secondary: {
      main: '#ffd432',
    },
  },
  typography: {
    fontFamily: 'Lora',
  },
}

export const theme = createTheme(themeOptions)
