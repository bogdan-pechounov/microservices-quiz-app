import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import {
  CreateQuestion,
  Question,
  useCreateQuizMutation,
} from '../redux/services/quizApi'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function CreateQuiz() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState<CreateQuestion[]>([])

  const [createQuiz] = useCreateQuizMutation()
  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      const result = await createQuiz({ name, description, questions }).unwrap()
      console.log(result)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Container>
      <Box component='form' p={2}>
        <Stack spacing={2}>
          {/* Name */}
          <TextField
            label='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          {/* Description */}
          <TextField
            label='description'
            rows={3}
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
          <Button onClick={handleSubmit}>Create Quiz</Button>
        </Stack>
        {/* Questions */}
        <p>Questions</p>
        <ul>
          {/* TODO what key to use if reordering */}
          {questions.map((question, i) => (
            <li key={i}>
              <TextField
                label='name'
                value={question.question}
                onChange={(e) =>
                  setQuestions((questions) => [
                    ...questions.slice(0, i),
                    { question: e.target.value },
                    ...questions.slice(i + 1),
                  ])
                }
              ></TextField>
            </li>
          ))}
        </ul>
        <Button
          onClick={(e) =>
            setQuestions((questions) => [...questions, { question: '' }])
          }
        >
          Add question
        </Button>
      </Box>
    </Container>
  )
}
