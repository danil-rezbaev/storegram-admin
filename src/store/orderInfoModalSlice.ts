import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderInfo } from "../pages/Orders/OrdersTypes";

export type OrderInfoModal = {
  data: OrderInfo | null,
  visible: boolean
}

const initialState: OrderInfoModal = {
  data: null,
  visible: false
}

const orderInfoModalSlice = createSlice({
  name: 'orderInfoModal',
  initialState,
  reducers: {
    openOrderInfoModal (state, action: PayloadAction<{ data: OrderInfo }>) {
      state.visible = true
      state.data = action.payload.data
    },
    closeOrderInfoModal (state) {
      state.visible = false
    }
  }
})

export const { openOrderInfoModal, closeOrderInfoModal } = orderInfoModalSlice.actions

export default orderInfoModalSlice.reducer
