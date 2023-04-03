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
import { Answer } from '../../types/answer'

type QuestionSlideProps = {
  question: Question
  handleNext: () => void
  onAnswer: (answer: Answer) => void
}

function QuestionSlide({ question, handleNext, onAnswer }: QuestionSlideProps) {
  const [selected, setSelected] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const [submitted, setSubmitted] = useState(false) // to know when to display Next button

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // find select answer based on string id
    const selectedAnswer = question.answers.find(
      (a) => a.id.toString() === selected
    )
    // check if correct
    if (selectedAnswer?.isCorrect) {
      setError(false)
      setHelperText('Correct!')
    } else {
      setError(true)
      setHelperText('Incorrect...')
    }
    setSubmitted(true)
    // notify parent
    if (selectedAnswer) onAnswer(selectedAnswer)
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value)
  }

  const reset = () => {
    setSelected('')
    setError(false)
    setHelperText('')
    setSubmitted(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant='standard'>
        {/* Question */}
        <FormLabel id='demo-error-radios'>{question.text}</FormLabel>
        {/* Select answer */}
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
        {/* Buttons */}
        {submitted ? (
          <Button
            onClick={() => {
              reset()
              handleNext()
            }}
          >
            Next
          </Button>
        ) : (
          <Button type='submit' variant='outlined' disabled={selected === ''}>
            Check Answer
          </Button>
        )}
      </FormControl>
    </form>
  )
}

export default QuestionSlide
