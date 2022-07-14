import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import boardReducer from './features/boardSlice'

export function makeStore() {
   return configureStore({
      reducer: {
         board: boardReducer,
      },
   })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store