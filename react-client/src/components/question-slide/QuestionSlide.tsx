import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { Question } from '../../types/question'
import { useState, FormEvent } from 'react'

type QuestionSlideProps = {
  question: Question
}

function QuestionSlide({ question }: QuestionSlideProps) {
  const [selected, setSelected] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const selectedAnswer = question.answers.find(
      (a) => a.id.toString() === selected
    )
    if (selectedAnswer?.isCorrect) {
      setError(false)
      setHelperText('Correct!')
    } else {
      setError(true)
      setHelperText('Incorrect...')
    }
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant='standard'>
        <FormLabel id='demo-error-radios'>{question.text}</FormLabel>
        <RadioGroup
          aria-labelledby='demo-error-radios'
          name='quiz'
          value={selected}
          onChange={handleRadioChange}
        >
          {question.answers.map((answer) => (
            <FormControlLabel
              key={answer.id}
              value={answer.id}
              label={answer.text}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type='submit' variant='outlined'>
          Check Answer
        </Button>
      </FormControl>
    </form>
  )
}

export default QuestionSlide
