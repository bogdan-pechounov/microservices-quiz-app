import { useParams } from 'react-router-dom'
import { useQuizQuery } from '../redux/services/quizApi'
import { useState } from 'react'
import QuestionSlide from '../components/question-slide/QuestionSlide'
import { Question } from '../types/question'

export default function QuizPage() {
  const { id } = useParams()

  const { data: quiz } = useQuizQuery(parseInt(id!), {})
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!quiz) return <></>

  const currentQuestion: Question | undefined = quiz.questions[currentIndex]

  const nextQuestion = () => {
    const numQuestions = quiz.questions.length
    setCurrentIndex((currentIndex) =>
      Math.min(currentIndex + 1, numQuestions - 1)
    )
  }

  return (
    <div>
      <h1>{quiz?.name}</h1>
      <p>{quiz?.description}</p>
      {/* Question */}
      <QuestionSlide question={currentQuestion} />
      {/* Next */}
      <button onClick={nextQuestion}>Next</button>
    </div>
  )
}
