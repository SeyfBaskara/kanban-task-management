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

interface IBoardProp {
   name: string
}

export const createBoard = createAsyncThunk('createBoard', async (newboard: IBoardProp, thunkAPI) => {
   const { data } = await API.createBoard(newboard)
   return data
})

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
      [createBoard.fulfilled.toString()]: (state, action: PayloadAction<IBoardProp>) => {
         state.boards = [...state.boards, action.payload]
      },
   },
})

export const { setIsHide, setIsLightbox, setIsAddBoard, addBoard } = boardSlice.actions

export default boardSlice.reducer
