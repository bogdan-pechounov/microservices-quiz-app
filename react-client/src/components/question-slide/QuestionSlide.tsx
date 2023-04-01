import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { Question } from '../../types/question'

type QuestionSlideProps = {
  question: Question
}

function QuestionSlide({ question }: QuestionSlideProps) {
  return (
    <>
      <p>{question.text}</p>
      <FormControl>
        <FormLabel id='demo-radio-buttons-group-label'>Answer</FormLabel>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='female'
          name='radio-buttons-group'
        >
          {question.answers.map((answer) => (
            <FormControlLabel
              key={answer.id}
              value={answer.text}
              label={answer.text}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default QuestionSlide
