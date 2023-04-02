import { useMemo } from 'react'
import {
  useDeleteQuizMutation,
  useQuizzesQuery,
} from '../../redux/services/quizApi'
import { useUser } from '../../redux/app/hooks'
import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Quiz } from '../../types/quiz'
function QuizList() {
  const { user } = useUser()
  const { data: quizzes } = useQuizzesQuery()
  const [deleteQuiz] = useDeleteQuizMutation()

  const myQuizzes = useMemo(
    () => quizzes?.filter((quiz) => quiz.userId === user?.id),
    [quizzes, user]
  )

  function handleDelete(quiz: Quiz) {
    deleteQuiz(quiz)
  }

  return (
    <List>
      {myQuizzes?.map((quiz) => (
        <ListItem
          key={quiz.id}
          secondaryAction={
            <IconButton
              edge='end'
              aria-label='delete'
              onClick={() => handleDelete(quiz)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={quiz.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default QuizList
