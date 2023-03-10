import * as React from 'react';
import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { OrderProduct } from "../../OrdersTypes";

export type OrdersTableProps = {
  data: OrderProduct[]
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
              sx={{ width: '50%', }}
            >
              <b>Название</b>
            </TableCell>
            <TableCell
              sx={{ width: '50%', }}
            >
              <b>Стоимость</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              hover
            >
              <TableCell>
                <Typography>
                  {row.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {row.price}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrdersTable
