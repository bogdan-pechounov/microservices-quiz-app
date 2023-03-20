import { Button, DialogActions, TextField } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import { useState } from 'react'
import { User, UserLogin } from '../../types/user'
import {
  useLoginMutation,
  useSignupMutation,
} from '../../redux/services/authApi'

type Props = {
  handleClose: () => void
}

export default function SignUpForm({ handleClose }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [signup, { isLoading }] = useSignupMutation()

  const handleSignUp = async () => {
    const user = await signup({ username, password })
    handleClose()
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
        <Button onClick={handleSignUp}>Sign up</Button>
      </DialogActions>
    </>
  )
}
