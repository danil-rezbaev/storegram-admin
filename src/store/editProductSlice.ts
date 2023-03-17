import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from "../pages/EditProduct/ProductTypes";

export type EditProduct = {
  data: Product,
  type: "edit" | "show"
}

const initialState: EditProduct = {
  data: {
    id: "",
    images: [''],
    title: "",
    description: "",
    category: "",
    price: 0,
    active: true,
  },
  type: "show"
}

const editProductSlice = createSlice({
  name: 'viewProduct',
  initialState,
  reducers: {
    addProduct (state, action: PayloadAction<{ data: Product, type?: "edit" | "show" }>) {
      const { data, type = "show" } = action.payload

      state.type = type
      state.data = data
    },
  }
})

export const { addProduct } = editProductSlice.actions

export default editProductSlice.reducer
