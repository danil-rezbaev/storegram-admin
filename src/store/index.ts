import { configureStore } from '@reduxjs/toolkit'
import OrderInfoModalReducer from './OrderInfoModalSlice'

const store = configureStore({
  reducer: {
    orderInfoModal: OrderInfoModalReducer,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
