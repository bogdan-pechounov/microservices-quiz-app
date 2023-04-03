import { useParams } from 'react-router-dom'
import { useQuizQuery } from '../redux/services/quizApi'
import { useState } from 'react'
import QuestionSlide from '../components/question-slide/QuestionSlide'
import { Question } from '../types/question'
import { Container, Typography } from '@mui/material'
import { Answer } from '../types/answer'

export default function QuizPage() {
  // question id
  const { id } = useParams()

  // get quiz
  const { data: quiz } = useQuizQuery(parseInt(id!), {})

  // quiz state
  const [currentIndex, setCurrentIndex] = useState(0) // current question index
  const [answers, setAnswers] = useState<Answer[]>([])

  if (!quiz) return <></>

  // compute values
  const currentQuestion: Question | undefined = quiz.questions[currentIndex] // quiz might not have any questions
  const completed = currentIndex > quiz.questions.length - 1 // answered last question

  const nextQuestion = () => {
    setCurrentIndex((currentIndex) => currentIndex + 1)
  }

  const handleAnswer = (answer: Answer) => {
    setAnswers([...answers, answer])
  }

  const score = () => {
    const numCorrectAnswers = answers.filter(
      (answer) => answer.isCorrect
    ).length
    const numQuestions = quiz.questions.length
    return `${numCorrectAnswers}/${numQuestions}`
  }

  return (
    <Container>
      <Typography variant='h3'>{quiz.name}</Typography>
      <Typography>{quiz.description}</Typography>
      {completed ? (
        // Quiz results
        <>
          <Typography>Results</Typography>
          <Typography>{score()}</Typography>
        </>
      ) : (
        // Question
        <QuestionSlide
          question={currentQuestion}
          handleNext={nextQuestion}
          onAnswer={handleAnswer}
        />
      )}
    </Container>
  )
}
