import { accountType } from '@/constants/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  user: accountType | null
  credential: {
    isAuthenticated: boolean
  }
}

const initialState: AuthState = {
  user: null,
  credential: {
    isAuthenticated: false
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<accountType>) => {
      state.user = action.payload
      state.credential.isAuthenticated = true
    },
    logout: (state) => {
      state.credential.isAuthenticated = false
    }
  }
})

export const AuthActions = authSlice.actions

export default authSlice.reducer
