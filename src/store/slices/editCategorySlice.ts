import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from "../../pages/Categories/CategoriesTypes";

export type EditCategory = {
  data: Category,
}

const initialState: EditCategory = {
  data: {
    id: '',
    code: '',
    title: '',
    active: false,
  },
}

const editCategorySlice = createSlice({
  name: 'viewProduct',
  initialState,
  reducers: {
    editCategory (state, action: PayloadAction<{ data: Category }>) {
      const { id, code, title, active } = action.payload.data

      state.data.id = id
      state.data.code = code
      state.data.title = title
      state.data.active = active
    },
  }
})

export const { editCategory } = editCategorySlice.actions

export default editCategorySlice.reducer
