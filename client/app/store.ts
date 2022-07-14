import { configureStore, ThunkAction, Action, Store } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import boardReducer from './features/boardSlice'

export function makeStore() {
   return configureStore({
      reducer: {
         board: boardReducer,
      },
   })
}

const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export const wrapper = createWrapper<AppStore>(makeStore)
