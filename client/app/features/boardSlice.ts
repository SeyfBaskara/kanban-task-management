import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import * as API from 'api/index'
import { takeCoverage } from 'v8'

export interface IBoardState {
   isHide: boolean
   isLightbox: boolean
   isAddBoard: boolean
   isAddTask: boolean
   isDeleteBoard: boolean
   isDeleteTask: boolean
   isEditBoard: boolean
   isEditTask: boolean
   isSelected: number
   boards: IBoards[]
}

const initialState: IBoardState = {
   isHide: false,
   isLightbox: false,
   isAddBoard: false,
   isAddTask: false,
   isDeleteBoard: false,
   isDeleteTask: false,
   isEditBoard: false,
   isEditTask: false,
   isSelected: 0,
   boards: [],
}

interface IBoardProps {
   id: string
   name: string
   boardID: string
}

interface IUpdatedBoardProps {
   id: string
   name: string
}
type IColumnProps = {
   id: string
   boardID: string
}

export const createBoard = createAsyncThunk('createBoard', async (newboard: IBoardProps, thunkAPI) => {
   const { data } = await API.createBoard(newboard)
   return data
})
export const deleteBoard = createAsyncThunk('deleteBoard', async (id: string, thunkAPI) => {
   const { data } = await API.deleteBoard(id)
   return data
})

export const updateBoard = createAsyncThunk('updateBoard', async (updatedBoard: IUpdatedBoardProps, thunkAPI) => {
   const newUpdatedBoard = {
      name: updatedBoard.name,
   }
   const { data } = await API.updateBoard(updatedBoard.id, newUpdatedBoard)
   return data
})

export const createColumn = createAsyncThunk('createColumn', async (newColumn: IColumns, thunkAPI) => {
   const { data } = await API.createColumn(newColumn)
   return data
})
export const deleteColumn = createAsyncThunk('deleteColumn', async (column: IColumnProps, thunkAPI) => {
   const { data } = await API.deleteColumn(column.id)
   return data
})

export const createTask = createAsyncThunk('createTask', async (newTask: ITasks, thunkAPI) => {
   const { data } = await API.createTask(newTask)
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
      setIsAddTask: (state, action: PayloadAction<boolean>) => {
         state.isAddTask = action.payload
      },
      setIsDeleteBoard: (state, action: PayloadAction<boolean>) => {
         state.isDeleteBoard = action.payload
      },
      setIsDeleteTask: (state, action: PayloadAction<boolean>) => {
         state.isDeleteTask = action.payload
      },
      setIsEditBoard: (state, action: PayloadAction<boolean>) => {
         state.isEditBoard = action.payload
      },
      setIsEditTask: (state, action: PayloadAction<boolean>) => {
         state.isEditTask = action.payload
      },
      setIsSelected: (state, action: PayloadAction<number>) => {
         state.isSelected = action.payload
      },
      addBoard: (state, action: PayloadAction<IBoardProps>) => {
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
      [createColumn.fulfilled.toString()]: (state, action: PayloadAction<IColumns>) => {
         const colum = state.boards.filter((board) =>
            board.boardID === action.payload.boardID ? board.columns?.push(action.payload) : board
         )
      },
      [deleteColumn.fulfilled.toString()]: (state, action: PayloadAction<IColumns>) => {
         const board = state.boards.filter((board) => board.boardID === action.payload.boardID)[0]
         const columns = board.columns?.filter((col) => col.id !== action.payload.id)
         board.columns = columns

         state.boards = [...state.boards]
      },

      [createTask.fulfilled.toString()]: (state, action: PayloadAction<ITasks>) => {
         state.boards = state.boards.filter((board) =>
            board.boardID === action.payload.boardID
               ? board.columns?.filter((col) => (col.name === action.payload.status ? col.tasks?.push(action.payload) : col))
               : board
         )
      },
   },
})

export const {
   setIsHide,
   setIsLightbox,
   setIsAddBoard,
   setIsAddTask,
   setIsDeleteBoard,
   setIsDeleteTask,
   setIsEditBoard,
   setIsEditTask,
   setIsSelected,
   addBoard,
} = boardSlice.actions

export default boardSlice.reducer
