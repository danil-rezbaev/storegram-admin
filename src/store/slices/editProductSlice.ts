import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from "../../types/Store";

export type EditProduct = {
  data: Product,
  type: "edit" | "create"
}

const initialState: EditProduct = {
  data: {
    _id: "",
    images: [''],
    title: "",
    description: "",
    category: "",
    price: 0,
    active: true,
    options: []
  },
  type: "create"
}

const editProductSlice = createSlice({
  name: 'viewProduct',
  initialState,
  reducers: {
    editProduct (state, action: PayloadAction<{ data: Product, type?: "edit" | "create" }>) {
      const { data, type = "create" } = action.payload

      state.type = type
      state.data = data
    },
  }
})

export const { editProduct } = editProductSlice.actions

export default editProductSlice.reducer
