import { OrderInfo } from "../../../pages/Orders/OrdersTypes";

export const orderData: OrderInfo[] = [
  {
    id: "ORDER-1",
    date: new Date().toDateString(),
    info: {
      customer: 'Ivan',
      phone: '+7 999 999 99 99'
    },
    products: [
      {
        title: "Phone 1",
        price: 500
      },
      {
        title: "Phone 2",
        price: 3500
      }
    ],
    amount: 1000,
    status: 'error'
  },
  {
    id: "ORDER-2",
    date: new Date().toDateString(),
    info: {
      customer: 'Ivan',
      phone: '+7 999 999 99 99'
    },
    products: [
      {
        title: "Phone 1",
        price: 500
      },
      {
        title: "Phone 2",
        price: 3500
      }
    ],
    amount: 1000,
    status: 'error'
  }
];
