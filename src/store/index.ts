import { configureStore } from '@reduxjs/toolkit'
import OrderInfoModalReducer from './orderInfoModalSlice'
import EditProductReducer from './editProductSlice'
import EditCategoryReducer from './editCategorySlice'
import DeleteProductModalReducer from './deleteProductModal'
import DeleteCategoryModalReducer from './deleteCategoryModal'

const store = configureStore({
  reducer: {
    orderInfoModal: OrderInfoModalReducer,
    editProduct: EditProductReducer,
    editCategory: EditCategoryReducer,
    deleteProductModal: DeleteProductModalReducer,
    deleteCategoryModal: DeleteCategoryModalReducer,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
