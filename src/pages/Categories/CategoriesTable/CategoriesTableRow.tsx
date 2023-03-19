import * as React from 'react';
import { FC } from 'react';
import { TableCell, TableRow, Typography } from "@mui/material";
import _ from "lodash";
import CategoriesTableControl from "./CategoriesTableControl";
import { Category } from "../CategoriesTypes";

export type ProductsTableRowProps = {
  data: Category
}

const CategoriesTableRow: FC<ProductsTableRowProps> = (props) => {
  const {
    data
  } = props

  const {
    code,
    title,
    active
  } = data

  const info = _.entries({code, title})

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
      hover
    >
      {info.map(item => (
        <TableCell key={item[0]}>
          <Typography>
            {item[1]}
          </Typography>
        </TableCell>
      ))}

      <TableCell>
        <Typography>
          {active ? "Да" : "Нет" }
        </Typography>
      </TableCell>

      <TableCell>
        <CategoriesTableControl data={data} />
      </TableCell>
    </TableRow>
  );
}

export default CategoriesTableRow
