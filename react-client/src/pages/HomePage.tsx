import CreateQuizButton from '../components/create-quiz/CreateQuizButton'
import { Box, Container } from '@mui/material'
import QuizGrid from '../components/quiz-grid/QuizGrid'

export default function HomePage() {
  return (
    <Container>
      <Box display='flex' justifyContent='center'>
        <CreateQuizButton />
      </Box>
      <QuizGrid />
    </Container>
  )
}
