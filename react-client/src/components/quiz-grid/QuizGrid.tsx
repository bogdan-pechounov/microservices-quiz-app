import React from 'react'
import { useQuizzesQuery } from '../../redux/services/quizApi'
import QuizCard from './QuizCard'
import { Grid } from '@mui/material'

function QuizGrid() {
  const { data: quizzes, isLoading, error } = useQuizzesQuery()

  return (
    <Grid container spacing={2} mt={1}>
      {quizzes?.map((quiz) => (
        <Grid key={quiz.id} item xs={12} md={6}>
          <QuizCard quiz={quiz} />
        </Grid>
      ))}
    </Grid>
  )
}

export default QuizGrid
