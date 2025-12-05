'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'

interface AuthState {
  userData: {},
  status: boolean
}

const initialState: AuthState = {
  userData: {},
  status: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload.userData
      state.status = true
    },
    logout: (state) => {
      state.userData = {}
      state.status = false
    }
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer