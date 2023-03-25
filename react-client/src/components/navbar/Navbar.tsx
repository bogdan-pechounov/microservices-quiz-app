import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AuthDialog from '../auth/AuthDialog'
import Logout from '../logout/Logout'
import { useTypedSelector } from '../../redux/app/hooks'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const user = useTypedSelector((state) => state.auth.user)
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
            <Link to='/'>Quiz</Link>
          </Typography>
          {user ? <Logout /> : <AuthDialog />}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
