import * as React from 'react';
import { FC } from 'react';
import { Chip } from "@mui/material";

export type OrderStatusProps = {
  type?: 'success' | 'error' | 'warning'
}

const OrderStatus: FC<OrderStatusProps> = (props) => {
  const {
    type
  } = props

  const data = {
    success: {
      title: "Оплачено",
    },
    error: {
      title: "Неоплачено",
    },
    warning: {
      title: "Ожидается",
    }
  }

  if(!type) return null

  return (
    <Chip
      label={data[type].title}
      color={type}
    />
  );
}

export default OrderStatus
