import React from 'react'
import { Quiz } from '../../redux/services/quizApi'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'

type QuizCardProps = {
  quiz: Quiz
}

function QuizCard({ quiz }: QuizCardProps) {
  const navigate = useNavigate()
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {quiz.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {quiz.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => navigate(`/quiz/${quiz.id}`)}>
          Start Quiz
        </Button>
      </CardActions>
    </Card>
  )
}

export default QuizCard
