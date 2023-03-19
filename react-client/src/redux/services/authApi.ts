import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User, UserLogin } from '../../types/user'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (builder) => ({
    hi: builder.query<string, void>({
      query: () => ({ url: '/', responseHandler: 'text' }),
    }),
    //Login
    login: builder.mutation<User, UserLogin>({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),
    //Sign up
    signup: builder.mutation<User, UserLogin>({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useHiQuery, useLoginMutation, useSignupMutation } = authApi
