import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DeleteProductModal = {
  type: 'error' | 'success',
  title: string,
  visible: boolean,
}

const initialState: DeleteProductModal = {
  type: 'error',
  title: "",
  visible: false
}

const floatAlertSlice = createSlice({
  name: 'floatAlert',
  initialState,
  reducers: {
    openFloatAlert (state, action: PayloadAction<Omit<DeleteProductModal, 'visible'>>) {
      const { type, title } = action.payload

      state.visible = true
      state.title = title
      state.type = type
    },
    closeFloatAlert (state) {
      state.visible = false
      state.title = ""
    },
  }
})

export const { openFloatAlert, closeFloatAlert } = floatAlertSlice.actions

export default floatAlertSlice.reducer
