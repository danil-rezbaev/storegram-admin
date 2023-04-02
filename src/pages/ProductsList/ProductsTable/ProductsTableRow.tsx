import * as React from 'react';
import { FC} from 'react';
import { TableCell, TableRow, Typography } from "@mui/material";
import _ from "lodash";
import ProductsTableControl from "./ProductsTableControl";
import { Product } from "../../../types/Store";
import InsertPhotoOutlined from '@mui/icons-material/InsertPhotoOutlined';

export type ProductsTableRowProps = {
  data: Product
}

const ProductsTableRow: FC<ProductsTableRowProps> = (props) => {
  const {
    data
  } = props

  const {
    images,
    title,
    category,
    price,
    active
  } = data

  const info = _.entries({title, category})

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
      hover
    >
      <TableCell>
        {images?.length > 0
          ? (
            <img
              src={`https://typper.online/${images[0]}`}
              style={{
                width: '100%',
                maxWidth: '80px',
                maxHeight: '80px'
              }}
              alt="preview product"
            />
          ) : (
            <InsertPhotoOutlined fontSize="large" />
          )}
      </TableCell>

      {info.map(item => (
        <TableCell key={item[0]}>
          <Typography>
            {item[1]}
          </Typography>
        </TableCell>
      ))}

      <TableCell>
        <Typography>
          {active ? "Да" : "Нет"}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {price}
        </Typography>
      </TableCell>

      <TableCell>
        <ProductsTableControl data={data} />
      </TableCell>
    </TableRow>
  );
}

export default ProductsTableRow
