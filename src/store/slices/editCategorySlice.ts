import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from "../../pages/Categories/CategoriesTypes";

export type EditCategory = {
  data: Category,
  type: "edit" | "create"
}

const initialState: EditCategory = {
  data: {
    code: '',
    title: '',
    active: false,
  },
  type: "create"
}

const editCategorySlice = createSlice({
  name: 'viewProduct',
  initialState,
  reducers: {
    editCategory (state, action: PayloadAction<{ data: Category, type?: "edit" | "create" }>) {
      const { data, type = "create" } = action.payload

      state.type = type
      state.data = data
    },
  }
})

export const { editCategory } = editCategorySlice.actions

export default editCategorySlice.reducer
