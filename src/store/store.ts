import { configureStore } from '@reduxjs/toolkit'

import testSlice from './test'

const rootReducer = {
  [testSlice.name]: testSlice.reducer,
}

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
