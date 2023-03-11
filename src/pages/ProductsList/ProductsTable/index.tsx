import * as React from 'react';
import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Product } from "../../Product/ProductTypes";
import ProductsTableRow from "./ProductsTableRow";

export type ProductsTableProps = {
  data: Product[]
}

const ProductsTable: FC<ProductsTableProps> = (props) => {
  const {
    data
  } = props

  const tableHead = [
    {
      title: "ID",
      sx: {width: '75px'}
    },
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
      <Table aria-label="simple table">
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
        <TableBody>
          {data.map((row) => (
            <ProductsTableRow
              key={row.id}
              data={row}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductsTable
