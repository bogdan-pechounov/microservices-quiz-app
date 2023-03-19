import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type User = {
  username: string
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (builder) => ({
    hi: builder.query<void, string>({
      query: () => '/',
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useHiQuery } = authApi
