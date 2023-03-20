import Button from '@mui/material/Button'
import { useLogoutMutation } from '../../redux/services/authApi'

export default function Logout() {
  const [logout] = useLogoutMutation()

  function handleClick() {
    logout()
  }
  return (
    <Button color='inherit' onClick={handleClick}>
      Logout
    </Button>
  )
}
