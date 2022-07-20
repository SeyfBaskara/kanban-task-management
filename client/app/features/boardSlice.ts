import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import * as API from 'api/index'

export interface IBoardState {
   isHide: boolean
   isLightbox: boolean
   isAddBoard: boolean
   isDeleteBoard: boolean
   isEditBoard: boolean
   isSelected: number
   boards: IBoards[]
}

const initialState: IBoardState = {
   isHide: false,
   isLightbox: false,
   isAddBoard: false,
   isDeleteBoard: false,
   isEditBoard: false,
   isSelected: 0,
   boards: [],
}

interface IBoardProps {
   name: string
   id: string
}

export const createBoard = createAsyncThunk('createBoard', async (newboard: IBoardProps, thunkAPI) => {
   const { data } = await API.createBoard(newboard)
   return data
})
export const deleteBoard = createAsyncThunk('deleteBoard', async (id: string, thunkAPI) => {
   const { data } = await API.deleteBoard(id)
   return data
})

export const updateBoard = createAsyncThunk('updateBoard', async (updatedBoard: IBoardProps, thunkAPI) => {
   const newUpdatedBoard = {
      name: updatedBoard.name,
   }
   const { data } = await API.updateBoard(updatedBoard.id, newUpdatedBoard)
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
      setIsDeleteBoard: (state, action: PayloadAction<boolean>) => {
         state.isDeleteBoard = action.payload
      },
      setIsEditBoard: (state, action: PayloadAction<boolean>) => {
         state.isEditBoard = action.payload
      },
      setIsSelected: (state, action: PayloadAction<number>) => {
         state.isSelected = action.payload
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
      [createBoard.fulfilled.toString()]: (state, action: PayloadAction<IBoardProps>) => {
         state.boards = [...state.boards, action.payload]
      },
      [deleteBoard.fulfilled.toString()]: (state, action: PayloadAction<IBoardProps>) => {
         state.boards = state.boards.filter((board) => board.id !== action.payload.id)
      },
      [updateBoard.fulfilled.toString()]: (state, action: PayloadAction<IBoardProps>) => {
         state.boards = state.boards.map((board) =>
            board.id === action.payload.id
               ? {
                    ...board,
                    name: action.payload.name,
                 }
               : board
         )
      },
   },
})

export const { setIsHide, setIsLightbox, setIsAddBoard, setIsDeleteBoard, setIsEditBoard, setIsSelected, addBoard } =
   boardSlice.actions

export default boardSlice.reducer
