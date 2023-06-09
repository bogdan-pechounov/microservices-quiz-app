import CreateQuizButton from '../components/create-quiz/CreateQuizButton'
import { Box, Container } from '@mui/material'
import QuizGrid from '../components/quiz-grid/QuizGrid'

/**
 * Page for the default route
 */
export default function HomePage() {
  return (
    <Container>
      <CreateQuizButton />
      <QuizGrid />
    </Container>
  )
}
