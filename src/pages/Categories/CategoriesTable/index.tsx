import * as React from 'react';
import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CategoriesTableRow from "./CategoriesTableRow";
import { Category } from "../CategoriesTypes";

export type CategoriesTableProps = {
  data: Category[]
}

const CategoriesTable: FC<CategoriesTableProps> = (props) => {
  const {
    data
  } = props

  const tableHead = [
    {
      title: "Код",
      sx: {width: '75px'}
    },
    {
      title: "Название",
      sx: {width: '200px'}
    },
    {
      title: "Включено",
      sx: {width: '200px'}
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
      <Table aria-label="category table">
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
            <CategoriesTableRow
              key={row.code}
              data={row}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CategoriesTable
