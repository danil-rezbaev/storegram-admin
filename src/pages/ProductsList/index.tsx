import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import { InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTable";
import { productsTable } from "../../layout/pages/products/products";
import DeleteProductModal from "./DeleteProductModal";

export type ProductsListProps = unknown

const ProductsList: FC<ProductsListProps> = () => {
  const navigate = useNavigate()
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const categories = [
    'burgers',
    'pizza'
  ]

  return (
    <PageContent
      title="Продукты"
      button={{
        title: "Добавить",
        handler: () => navigate('/add-product')
      }}
    >

      <FormControl
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 130px',
          gridGap: '10px'
        }}
      >
        <TextField
          id="input-with-icon-textfield"
          placeholder="Найти продукт"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
        />

        <FormControl
          sx={{
            width: '130px'
          }}
        >
          <InputLabel id="products-categories">Категории</InputLabel>
          <Select
            labelId="products-categories--id"
            id="products-categories"
            value={category}
            label="Категории"
            onChange={handleChange}
          >
            {categories.map((item) => (
              <MenuItem value={item}>{ item }</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormControl>

      <ProductsTable data={productsTable} />

      <DeleteProductModal/>
    </PageContent>
  );
}

export default ProductsList
