import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../../services/authApi'
import { RootState } from '../../app/store'
import { User } from '../../../types/user'

type AuthState = {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.me.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    )
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, action) => {
        state.user = null
      }
    )
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload
      }
    )
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        state.user = action.payload
      }
    )
  },
})

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
