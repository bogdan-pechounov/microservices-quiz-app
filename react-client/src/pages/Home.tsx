import { Link } from 'react-router-dom'
import { useTypedSelector } from '../redux/app/hooks'
import Button from '@mui/material/Button'

export default function Home() {
  const user = useTypedSelector((state) => state.auth.user)

  return (
    <div>
      {user?.username}
      <Link to='/quiz/create'>
        <Button variant='contained'>Create quiz</Button>
      </Link>
    </div>
  )
}
