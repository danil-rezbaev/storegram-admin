import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DeleteProductModal = {
  id: string,
  title: string,
  visible: boolean,
}

const initialState: DeleteProductModal = {
  id: '',
  title: "",
  visible: false
}

const deleteCategoryModalSlice = createSlice({
  name: 'deleteCategory',
  initialState,
  reducers: {
    openDeleteCategoryModal (state, action: PayloadAction<Omit<DeleteProductModal, 'visible'>>) {
      const { id, title } = action.payload

      state.visible = true
      state.title = title
      state.id = id
    },
    closeDeleteCategoryModal(state) {
      state.title = ''
      state.visible = false
      state.id = ''
    }
  }
})

export const { openDeleteCategoryModal, closeDeleteCategoryModal } = deleteCategoryModalSlice.actions

export default deleteCategoryModalSlice.reducer
