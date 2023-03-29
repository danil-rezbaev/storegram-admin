import * as React from 'react';
import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ProductsTableRow from "./ProductsTableRow";
import { Product } from "../../../types/Store";

export type ProductsTableProps = {
  data: Product[]
}

const ProductsTable: FC<ProductsTableProps> = (props) => {
  const {
    data
  } = props

  const tableHead = [
    {
      title: "Изображение",
      sx: {width: '150px'}
    },
    {
      title: "Название",
      sx: {}
    },
    {
      title: "Категория",
      sx: {width: '300px'}
    },
    {
      title: "Активно",
      sx: {width: '300px'}
    },
    {
      title: "Стоимость",
      sx: {width: '150px'}
    },
    {
      title: "",
      sx: {width: '50px'}
    }
  ]

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2
      }}
    >
      <Table aria-label="products table">
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
            {tableHead.map(item => (
              <TableCell
                key={item.title}
                scope="row"
                sx={item.sx}
              >
                <b>{ item.title }</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>


        {data.length >= 0 ? (
          <TableBody>
            { data.map((row) => (
                <ProductsTableRow
                  key={ row._id }
                  data={ row }
                />
              )) }
          </TableBody>
        ) : null }
      </Table>
    </TableContainer>
  );
}

export default ProductsTable
