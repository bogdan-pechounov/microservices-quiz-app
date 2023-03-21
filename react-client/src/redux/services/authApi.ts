import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type User = {
  username: string
}

export type UserLogin = User & {
  password: string
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (builder) => ({
    me: builder.query<User, void>({
      query: () => ({ url: '/me' }),
    }),
    //Login
    login: builder.mutation<User, UserLogin>({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),
    //Logout
    logout: builder.mutation<User, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        responseHandler: 'text',
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
export const {
  useMeQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi
