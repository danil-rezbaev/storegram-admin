import { OrderProduct } from "./Store";

// export type OrderProduct = {
//   title: string,
//   price: number
// }

export type OrderInfo = {
  id: string,
  date: string,
  client: {
    name: string,
    phone: string,
  },
  products: OrderProduct[],
  quantity: number,
  amount: number,
  // status: 'success' | 'error'
}
