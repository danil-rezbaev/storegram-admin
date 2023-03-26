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

const deleteProductModalSlice = createSlice({
  name: 'deleteProductModal',
  initialState,
  reducers: {
    openDeleteProductModal (state, action: PayloadAction<Omit<DeleteProductModal, 'visible'>>) {
      const { id, title } = action.payload

      state.visible = true
      state.title = title
      state.id = id
    },
    closeDeleteProductModal(state) {
      state.title = ''
      state.visible = false
      state.id = ''
    }
  }
})

export const { openDeleteProductModal, closeDeleteProductModal } = deleteProductModalSlice.actions

export default deleteProductModalSlice.reducer
