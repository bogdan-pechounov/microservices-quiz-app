import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { useCreateQuizMutation } from '../redux/services/quizApi'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import QuestionForm from '../components/question-form/QuestionForm'
import { CreateQuestion } from '../types/question'

/**
 * Page for creating a quiz
 */
export default function CreateQuiz() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState<CreateQuestion[]>([])

  const [createQuiz] = useCreateQuizMutation()
  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      const result = await createQuiz({ name, description, questions }).unwrap()
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  function updateQuestion(question: CreateQuestion, index: number) {
    setQuestions((questions) => [
      ...questions.slice(0, index),
      question,
      ...questions.slice(index + 1),
    ])
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
        </Stack>
        {/* Questions */}
        <p>Questions</p>
        <Stack gap={1}>
          {/* TODO what key to use if reordering */}
          {questions.map((question, i) => (
            <QuestionForm
              key={i}
              question={question}
              onChange={(question) => updateQuestion(question, i)}
            />
          ))}
        </Stack>
        {/* Add new question */}
        <Button
          onClick={(e) =>
            setQuestions((questions) => [
              ...questions,
              { text: '', answers: [] },
            ])
          }
        >
          Add question
        </Button>
      </Box>
      {/* Submit */}
      <Button onClick={handleSubmit} variant='contained'>
        Create Quiz
      </Button>
    </Container>
  )
}
