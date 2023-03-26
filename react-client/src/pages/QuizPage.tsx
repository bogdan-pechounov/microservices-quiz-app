import { useParams } from 'react-router-dom'
import { useQuizQuery } from '../redux/services/quizApi'

export default function QuizPage() {
  const { id } = useParams()

  const { data: quiz } = useQuizQuery(parseInt(id!), {})

  return (
    <div>
      <h1>{quiz?.name}</h1>
      <p>{quiz?.description}</p>
      <ul>
        {quiz?.questions?.map((question) => (
          <li key={question.id}>{question.question}</li>
        ))}
      </ul>
    </div>
  )
}
