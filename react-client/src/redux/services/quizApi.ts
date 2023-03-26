import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Question = {
  id: number
  question: string
}

export type CreateQuiz = {
  name: string
  description: string
  questions?: Question[]
}

// add user fields
export type Quiz = CreateQuiz & {
  id: number
  userId: string
  author: string
}

// Define a service using a base URL and expected endpoints
export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/quiz' }),
  tagTypes: ['Quiz'], //for automated refetching
  endpoints: (builder) => ({
    // get quizzes
    quizzes: builder.query<Quiz[], void>({
      query: () => ({ url: '/' }),
      providesTags: ['Quiz'], //tag for refetching
    }),
    // get quiz by id
    quiz: builder.query<Quiz, number>({
      query: (id) => ({ url: `/${id}` }),
    }),
    // create quiz
    createQuiz: builder.mutation<Quiz, CreateQuiz>({
      query: (quiz) => ({
        url: '/',
        method: 'POST',
        body: quiz,
      }),
      invalidatesTags: ['Quiz'], //invalidate cache with that tag
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useQuizzesQuery, useQuizQuery, useCreateQuizMutation } = quizApi
