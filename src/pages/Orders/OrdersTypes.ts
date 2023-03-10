type OrderProduct = {
  title: string,
  price: number
}

export type OrderInfo = {
  id: string,
  date: string,
  info: {
    customer: string,
    phone: string,
  },
  products: OrderProduct[],
  amount: number,
  status: 'success' | 'error'
}
