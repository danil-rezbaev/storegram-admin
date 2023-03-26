import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { ChangeEvent, FC, useEffect } from 'react';
import PageContent from "../../components/PageContent";
import { InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTable";
import DeleteProductModal from "../../modal/DeleteProductModal";
import { useAppSelector } from "../../hooks/redux";
import { Category, Product } from "../../types/Store";

export type ProductsListProps = unknown

const ProductsList: FC<ProductsListProps> = () => {
  const {current, currentStore} = useAppSelector(store => store.store)

  const navigate = useNavigate()
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [productsModified, setProductsModified] = React.useState<Product[]>(products);
  const [category, setCategory] = React.useState('');

  const [search, setSearch] = React.useState('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    if(search) {
      const pattern = new RegExp(search.toLowerCase())

      const filterProducts = products.filter(item => {
        const title = item.title.toLowerCase()
        return pattern.test(title)
      })
      setProductsModified(filterProducts)
    } else {
      setProductsModified(products)
    }
  }, [products, search])

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    if(current) {
      const productsFormat = currentStore?.products || []
      setProducts(productsFormat)

      const categoriesFormat = currentStore?.categories || []
      setCategories(categoriesFormat)
    }
  }, [current, currentStore])

  return (
    <PageContent
      title="Товары"
      button={{
        title: "Создать",
        handler: () => navigate('/create-product')
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
          value={search}
          onChange={handleSearch}
          placeholder="Поиск по названию"
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
            disabled={!categories.length}
          >
            {categories.map((item) => (
              <MenuItem value={item.code}>{ item.title }</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormControl>

      <ProductsTable data={productsModified} />

      <DeleteProductModal/>
    </PageContent>
  );
}

export default ProductsList
