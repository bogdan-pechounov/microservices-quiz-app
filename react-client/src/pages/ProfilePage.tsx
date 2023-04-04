import React from 'react'
import QuizList from '../components/quiz-list/QuizList'
import { Typography } from '@mui/material'

export default function ProfilePage() {
  return (
    <>
      <Typography variant='h5'>My Quizzes</Typography>
      <QuizList />
    </>
  )
}
