import { Answer, CreateAnswer } from './answer'

export type CreateQuestion = {
  text: string
  answers: CreateAnswer[]
}

// after added to database
export type Question = Omit<CreateQuestion, 'answers'> & {
  id: number
  answers: Answer[]
}
