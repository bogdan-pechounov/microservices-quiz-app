import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import { useState } from 'react'
import { CreateQuestion } from '../../types/question'
import { useEffect } from 'react'

type QuestionProps = {
  question: CreateQuestion
  onChange: (question: CreateQuestion) => void
}

function QuestionForm({ question, onChange }: QuestionProps) {
  const [correctAnswer, setCorrectAnswer] = useState(0)

  // change correct answer
  useEffect(() => {
    onChange({
      ...question,
      answers: question.answers.map((answer, i) => ({
        ...answer,
        isCorrect: correctAnswer === i,
      })),
    })
  }, [correctAnswer])

  function generateEmptyAnswer() {
    onChange({
      ...question,
      answers: [
        ...question.answers,
        {
          text: '',
          isCorrect: false,
        },
      ],
    })
  }

  function updateAnswer(index: number, text: string) {
    onChange({
      ...question,
      answers: question.answers.map((answer, i) =>
        index === i ? { ...answer, text } : answer
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
          {/* Animatation */}
          <TransitionGroup>
            {question.answers.map((answer, i) => (
              <Collapse key={i}>
                <Stack direction='row' mb={1}>
                  <Radio
                    checked={answer.isCorrect}
                    onChange={() => setCorrectAnswer(i)}
                    value={i}
                    name='radio-buttons'
                  />
                  {/* Answer text */}
                  <TextField
                    label={`Answer ${i}`}
                    value={answer.text}
                    onChange={(e) => updateAnswer(i, e.target.value)}
                    fullWidth
                  />
                </Stack>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </Paper>
  )
}

export default QuestionForm
