import * as React from 'react';
import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { OrderProduct } from "../../../../types/Store";
import { useAppSelector } from "../../../../hooks/redux";

export type ProductsInfoTableProps = {
  data: OrderProduct[]
}

const ProductsInfoTable: FC<ProductsInfoTableProps> = (props) => {
  const {
    data
  } = props

  const orderInfo = useAppSelector(store => store.orderInfoModal.data)

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
              sx={{ width: '33.3%', }}
            >
              <b>Название</b>
            </TableCell>
            <TableCell
              sx={{ width: '33.3%', }}
            >
              <b>Кол-во</b>
            </TableCell>

            <TableCell
              sx={{ width: '33.3%', }}
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
                  {row.count}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography>
                  {row.price}
                </Typography>
              </TableCell>
            </TableRow>
          ))}

          <TableRow
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
            hover
          >
            <TableCell>
              <Typography>
                Итого
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {orderInfo?.quantity}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography>
                {orderInfo?.amount}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductsInfoTable
