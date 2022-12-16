import { configureStore } from '@reduxjs/toolkit'

import testSlice from './test'

export const store = configureStore({
  reducer: {
    [testSlice.name]: testSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
