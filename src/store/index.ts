import { configureStore } from '@reduxjs/toolkit'
import OrderInfoModalReducer from './orderInfoModalSlice'
import ViewProductReducer from './viewProductSlice'
import DeleteProductModalReducer from './deleteProductModal'

const store = configureStore({
  reducer: {
    orderInfoModal: OrderInfoModalReducer,
    viewProduct: ViewProductReducer,
    deleteProductModal: DeleteProductModalReducer,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
