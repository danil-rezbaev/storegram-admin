import * as React from 'react';
import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import OrdersTableRow  from "./TableRow";
import { OrderInfo } from "../../OrdersTypes";

export type OrdersTableProps = {
  data: OrderInfo[]
}

const OrdersTable: FC<OrdersTableProps> = (props) => {
  const {
    data
  } = props


  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              scope="row"
              sx={{
                width: '90px',
              }}
            >
              <b>Дата</b>
            </TableCell>
            <TableCell>
              <b>Информация</b>
            </TableCell>
            <TableCell
              sx={{
                width: '10%',
                minWidth: '100px'
              }}
            >
              <b>Статус</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <OrdersTableRow
              key={row.id}
              data={row}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrdersTable
