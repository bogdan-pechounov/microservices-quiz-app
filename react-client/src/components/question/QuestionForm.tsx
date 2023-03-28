import { Box, Paper, TextField } from '@mui/material'
import { CreateQuestion } from '../../redux/services/quizApi'

type QuestionProps = {
  question: CreateQuestion
  onChange: (question: CreateQuestion) => void
}

function QuestionForm({ question, onChange }: QuestionProps) {
  return (
    <Paper elevation={1}>
      <Box p={2}>
        <TextField
          label='Question'
          value={question.question}
          onChange={(e) => onChange({ question: e.target.value })}
          fullWidth
        ></TextField>
      </Box>
    </Paper>
  )
}

export default QuestionForm
