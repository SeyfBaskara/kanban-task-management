import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import * as API from 'api/index'

export interface IBoardState {
   isHide: boolean
   isLightbox: boolean
   isAddBoard: boolean
   boards: IBoards[]
}

const initialState: IBoardState = {
   isHide: false,
   isLightbox: false,
   isAddBoard: false,
   boards: [],
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
      addBoard: (state, action: PayloadAction<IBoards>) => {
         state.boards = [...state.boards, action.payload]
      },
   },
   extraReducers: {
      [HYDRATE]: (state, action) => {
         if (!action.payload.board.boards[0]) {
            return state
         }
         state.boards = action.payload.board.boards[0]
      },
   },
})

export const { setIsHide, setIsLightbox, setIsAddBoard, addBoard } = boardSlice.actions

export default boardSlice.reducer
