import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slices/authSlice'
import StoreReducer from './slices/storeSlice'
import OrderInfoModalReducer from './slices/orderInfoModalSlice'
import EditProductReducer from './slices/editProductSlice'
import EditCategoryReducer from './slices/editCategorySlice'
import DeleteProductModalReducer from './slices/deleteProductModal'
import DeleteCategoryModalReducer from './slices/deleteCategoryModal'
import FloatAlertReducer from './slices/floatAlertSlice'
import CreateStoreModalReducer from './slices/createStoreModal'

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    store: StoreReducer,
    orderInfoModal: OrderInfoModalReducer,
    editProduct: EditProductReducer,
    editCategory: EditCategoryReducer,
    deleteProductModal: DeleteProductModalReducer,
    deleteCategoryModal: DeleteCategoryModalReducer,
    floatAlert: FloatAlertReducer,
    createStoreModal: CreateStoreModalReducer,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
