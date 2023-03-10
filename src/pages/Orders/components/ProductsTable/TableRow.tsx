import * as React from 'react';
import { FC } from 'react';
import { TableCell, TableRow } from "@mui/material";
import OrderStatus from "../OrderStatus";
import DateFormat from "../DateFormat";
import { OrderInfo } from "../../OrdersTypes";
import { useAppDispatch } from "../../../../hooks/redux";
import { openOrderInfoModal } from "../../../../store/OrderInfoModalSlice";

export type OrdersTableRowProps = {
  data: OrderInfo
}

const OrdersTableRow: FC<OrdersTableRowProps> = (props) => {
  const {data} = props

  const {
    id,
    date,
    amount,
    status
  } = data

  const dispatch = useAppDispatch()

  const openInfo = () => {
    dispatch(openOrderInfoModal({data}))
  }

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        cursor: 'pointer'
      }}
      onClick={openInfo}
      hover
    >
      <TableCell>
        <DateFormat date={date}/>
      </TableCell>
      <TableCell>
        <b>{id}</b>
        <p>Сумма заказа {amount}</p>
      </TableCell>
      <TableCell align="right">
        <OrderStatus type={status} />
      </TableCell>
    </TableRow>
  );
}

export default OrdersTableRow
