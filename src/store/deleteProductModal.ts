import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DeleteProductModal = {
  id: string,
  title: string,
  visible: boolean
}

const initialState: DeleteProductModal = {
  id: '',
  title: "",
  visible: false
}

const deleteProductModalSlice = createSlice({
  name: 'deleteProductModal',
  initialState,
  reducers: {
    openDeleteProductModal (state, action: PayloadAction<{ id: string, title: string}>) {
      const { id, title } = action.payload

      state.visible = true
      state.id = id
      state.title = title
    },
    closeDeleteProductModal(state) {
      state.visible = false
    }
  }
})

export const { openDeleteProductModal, closeDeleteProductModal } = deleteProductModalSlice.actions

export default deleteProductModalSlice.reducer
