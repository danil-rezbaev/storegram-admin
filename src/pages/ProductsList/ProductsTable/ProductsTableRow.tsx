import * as React from 'react';
import { FC } from 'react';
import { TableCell, TableRow, Typography } from "@mui/material";
import { Product } from "../../EditProduct/ProductTypes";
import _ from "lodash";
import ProductsTableControl from "./ProductsTableControl";

export type ProductsTableRowProps = {
  data: Product
}

const ProductsTableRow: FC<ProductsTableRowProps> = (props) => {
  const {
    data
  } = props

  const {
    id,
    images,
    title,
    category,
    price
  } = data

  const info = _.entries({title, category, price})

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
      hover
    >
      <TableCell>
        <Typography>
          {id}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          <img
            src={images[0]}
            style={{
              width: '100%',
              maxWidth: '80px',
              maxHeight: '80px'
            }}
            alt="preview product"
          />
        </Typography>
      </TableCell>

      {info.map(item => (
        <TableCell key={item[0]}>
          <Typography>
            {item[1]}
          </Typography>
        </TableCell>
      ))}

      <TableCell>
        <ProductsTableControl id={id} title={title} />
      </TableCell>
    </TableRow>
  );
}

export default ProductsTableRow
