import { CreateQuestion, Question } from './question'

export type CreateQuiz = {
  name: string
  description: string
  questions: CreateQuestion[]
}

// add user fields
export type Quiz = Omit<CreateQuiz, 'questions'> & {
  id: number
  userId: string
  author: string
  questions: Question[]
}
