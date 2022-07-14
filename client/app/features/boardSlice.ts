import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import type { AppState, AppThunk } from '../store'

export interface IBoardState {
   isHide: boolean
   isLightbox: boolean
   isAddBoard: boolean
}

const initialState: IBoardState = {
   isHide: false,
   isLightbox: false,
   isAddBoard: false,
}

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
      setIsHide: (state, action: PayloadAction<boolean>) => {
         state.isHide = action.payload
      },
      setIsLightbox: (state, action: PayloadAction<boolean>) => {
         state.isLightbox = action.payload
      },
      setIsAddBoard: (state, action: PayloadAction<boolean>) => {
         state.isAddBoard = action.payload
      },
   },
})

export const { setIsHide, setIsLightbox, setIsAddBoard } = boardSlice.actions

export default boardSlice.reducer
