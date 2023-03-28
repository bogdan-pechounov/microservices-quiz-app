import React from 'react'
import { useQuizzesQuery } from '../../redux/services/quizApi'
import QuizCard from './QuizCard'

function QuizList() {
  const { data: quizzes, isLoading, error } = useQuizzesQuery()

  return (
    <div>
      {quizzes?.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  )
}

export default QuizList
