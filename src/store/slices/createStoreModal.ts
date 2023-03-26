import { createSlice } from '@reduxjs/toolkit'

export type CreateStoreModal = {
  visible: boolean,
}

const initialState: CreateStoreModal = {
  visible: false
}

const createStoreModalSlice = createSlice({
  name: 'createStore',
  initialState,
  reducers: {
    openCreateStoreModal (state) {
      state.visible = true
    },
    closeCreateStoreModal(state) {
      state.visible = false
    }
  }
})

export const { openCreateStoreModal, closeCreateStoreModal } = createStoreModalSlice.actions

export default createStoreModalSlice.reducer
