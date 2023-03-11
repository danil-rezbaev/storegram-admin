import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from "../pages/Product/ProductTypes";

export type ViewProduct = {
  data: Product | null,
  type: "edit" | "show"
}

const initialState: ViewProduct = {
  data: null,
  type: "show"
}

const viewProductSlice = createSlice({
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

export const { addProduct } = viewProductSlice.actions

export default viewProductSlice.reducer
