import * as React from 'react';
import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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
      xs: {width: '75px'}
    },
    {
      title: "Название",
      xs: {width: '200px'}
    },
    {
      title: "Включено",
      xs: {width: '200px'}
    },
    {
      title: "",
      xs: {
        width: '50px',
        textAlign: 'center'
      }
    }
  ]

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2
      }}
    >
      <Table aria-label="categories-table">
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
                sx={item.xs}
              >
                <b>{ item.title }</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {data.length >= 0 ? (
          <TableBody>
            { data.map((row) => (
              <CategoriesTableRow
                key={row.code}
                data={row}
              />
            )) }
          </TableBody>
        ) : null }
      </Table>
    </TableContainer>
  );
}

export default CategoriesTable
