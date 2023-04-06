import * as React from 'react';
import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import OrdersTableRow from "./TableRow";
import { OrderInfo } from "../../../../types/Order";

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
        {data.length === 0 ? (
          <caption style={{
            textAlign: 'center'
          }}>
            <Typography>
              Нет элементов в списке
            </Typography>
          </caption>
        ) : null }

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
            <TableCell
              sx={{
                width: '30%',
                minWidth: '200px'
              }}
            >
              <b>Информация</b>
            </TableCell>

            <TableCell>
              <b>Клиент</b>
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
