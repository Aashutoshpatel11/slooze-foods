'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'

interface PermissionState {
  country: string,
  role: string
}

const initialState: PermissionState = {
  country: "",
  role: "",
}

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    add: (state, action) => {
      state.country = action.payload.country
      state.role = action.payload.role || ""
    },
    remove: (state) => {
      state.country=""
      state.role=""
    }
  },
})

export const { add, remove } = permissionSlice.actions

export default permissionSlice.reducer