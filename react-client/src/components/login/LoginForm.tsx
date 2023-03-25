import { Button, DialogActions, TextField } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import { useState } from 'react'
import { useLoginMutation } from '../../redux/services/authApi'

type Props = {
  handleClose: () => void
}

/**
 * Login form
 */
export default function LoginForm({ handleClose }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, { isLoading }] = useLoginMutation()

  const handleLogin = async () => {
    try {
      await login({ username, password }).unwrap()
      handleClose()
    } catch (err) {
      //TODO toast msg
      console.log(err)
    }
  }

  return (
    <>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='username'
          label='Username'
          type='text'
          fullWidth
          variant='standard'
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin='dense'
          id='password'
          label='Password'
          type='password'
          fullWidth
          variant='standard'
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
    </>
  )
}
