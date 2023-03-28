import { useParams } from 'react-router-dom'
import { Question, useQuizQuery } from '../redux/services/quizApi'
import { useState } from 'react'

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

  function QuestionSlide() {
    if (!currentQuestion) return <></>
    return (
      <>
        <p>{'Question ' + currentIndex}</p>
        <p>{currentQuestion.question}</p>
      </>
    )
  }

  return (
    <div>
      <h1>{quiz?.name}</h1>
      <p>{quiz?.description}</p>
      {/* <ul>
        {quiz?.questions.map((question) => (
          <li key={question.id}>{question.question}</li>
        ))}
      </ul> */}
      {/* Question */}
      <QuestionSlide />
      {/* Next */}
      <button onClick={nextQuestion}>Next</button>
    </div>
  )
}
