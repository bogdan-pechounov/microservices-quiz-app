import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { useCreateQuizMutation } from '../redux/services/quizApi'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function CreateQuiz() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [createQuiz] = useCreateQuizMutation()
  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      const result = await createQuiz({ name, description }).unwrap()
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
          <TextField
            label='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            label='description'
            rows={3}
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
          <Button onClick={handleSubmit}>Create Quiz</Button>
        </Stack>
      </Box>
    </Container>
  )
}
