export type CreateAnswer = {
  text: string
  isCorrect: boolean
}

export type Answer = CreateAnswer & {
  id: number
}
