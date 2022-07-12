import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import type { AppState, AppThunk } from '../store'

export interface BoardState {
   isHide: boolean
}

const initialState: BoardState = {
   isHide: false,
}

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
      setIsHide: (state, action: PayloadAction<boolean>) => {
         state.isHide = action.payload
      },
   },
})

export const { setIsHide } = boardSlice.actions

export default boardSlice.reducer
