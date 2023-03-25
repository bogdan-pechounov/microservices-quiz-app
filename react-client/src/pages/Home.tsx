import { Link } from 'react-router-dom'
import { useTypedSelector } from '../redux/app/hooks'
import Button from '@mui/material/Button'
import { useQuizzesQuery } from '../redux/services/quizApi'

export default function Home() {
  const user = useTypedSelector((state) => state.auth.user)

  const { data: quizzes, isLoading, error } = useQuizzesQuery()

  return (
    <div>
      {user?.username}
      <Link to='/quiz/create'>
        <Button variant='contained'>Create quiz</Button>
      </Link>
      {quizzes?.map((quiz) => (
        <div key={quiz.id}>{quiz.name}</div>
      ))}
    </div>
  )
}
