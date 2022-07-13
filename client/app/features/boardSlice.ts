import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import type { AppState, AppThunk } from '../store'

export interface IBoardState {
   isHide: boolean
   isLightbox: boolean
   isModal: boolean
}

const initialState: IBoardState = {
   isHide: false,
   isLightbox: false,
   isModal: false,
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
      setIsModal: (state, action: PayloadAction<boolean>) => {
         state.isModal = action.payload
      },
   },
})

export const { setIsHide, setIsLightbox, setIsModal } = boardSlice.actions

export default boardSlice.reducer
