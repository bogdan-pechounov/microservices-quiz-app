import { Box, Button, Collapse, List, Paper, TextField } from '@mui/material'
import { CreateQuestion } from '../../redux/services/quizApi'
import { TransitionGroup } from 'react-transition-group'
import { useState } from 'react'

type QuestionProps = {
  question: CreateQuestion
  onChange: (question: CreateQuestion) => void
}

function QuestionForm({ question, onChange }: QuestionProps) {
  const [id, setId] = useState(0)

  function generateEmptyAnswer() {
    setId((id) => {
      onChange({
        text: '',
        answers: [
          ...question.answers,
          {
            id,
            text: '',
          },
        ],
      })
      return id + 1
    })
  }

  function updateAnswer(id: number, text: string) {
    onChange({
      ...question,
      answers: question.answers.map((answer) =>
        answer.id === id ? { ...answer, text } : answer
      ),
    })
  }

  return (
    <Paper elevation={1}>
      <Box p={2}>
        {/* Question */}
        <TextField
          label='Question'
          value={question.text}
          onChange={(e) => onChange({ ...question, text: e.target.value })}
          fullWidth
        ></TextField>
        {/* Add answer */}
        <Button onClick={generateEmptyAnswer}>Add Answer</Button>
        {/* Answers */}
        <List>
          <TransitionGroup>
            {question.answers.map((answer) => (
              <Collapse key={answer.id}>
                <TextField
                  label={`Answer ${answer.id}`}
                  value={answer.text}
                  onChange={(e) => updateAnswer(answer.id, e.target.value)}
                  fullWidth
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </Paper>
  )
}

export default QuestionForm
