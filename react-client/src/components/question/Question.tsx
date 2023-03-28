import { Paper, TextField } from '@mui/material'
import { CreateQuestion } from '../../redux/services/quizApi'

type QuestionProps = {
  question: CreateQuestion
  onChange: (question: CreateQuestion) => void
}

function Question({ question, onChange }: QuestionProps) {
  return (
    <Paper elevation={1}>
      <TextField
        label='question'
        value={question.question}
        onChange={(e) => onChange({ question: e.target.value })}
      ></TextField>
    </Paper>
  )
}

export default Question
