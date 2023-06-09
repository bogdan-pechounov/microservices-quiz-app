import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AuthDialog from '../auth/AuthDialog'
import Logout from '../logout/Logout'
import { useUser } from '../../redux/app/hooks'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material'

export default function Navbar() {
  const { user } = useUser()
  const navigate = useNavigate()

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
          {/* Main link */}
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to='/'>Quiz</Link>
          </Typography>
          {/* Login or logout */}
          {user ? (
            <Stack direction='row' spacing={1}>
              <Button
                sx={{ color: '#fff' }}
                onClick={() => navigate('/profile')}
              >
                {user.username}
              </Button>
              <Logout />
            </Stack>
          ) : (
            <AuthDialog />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
