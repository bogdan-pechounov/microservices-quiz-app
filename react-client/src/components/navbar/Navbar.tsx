import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LoginDialog from '../login/LoginDialog'
import { useMeQuery } from '../../redux/services/authApi'
import Logout from '../logout/Logout'

export default function Navbar() {
  const { data } = useMeQuery()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Quiz
          </Typography>
          {data ? <Logout /> : <LoginDialog />}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
