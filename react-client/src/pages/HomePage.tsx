import { Link } from 'react-router-dom'
import { useTypedSelector } from '../redux/app/hooks'
import Button from '@mui/material/Button'
import { useQuizzesQuery } from '../redux/services/quizApi'
import CreateQuizButton from '../components/create-quiz/CreateQuizButton'
import QuizList from '../components/quiz-list/QuizList'
import { Box, Container } from '@mui/material'

export default function HomePage() {
  return (
    <Container>
      <Box display='flex' justifyContent='center'>
        <CreateQuizButton />
      </Box>
      <QuizList />
    </Container>
  )
}
