import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import PageContent from "../../components/PageContent";
import { InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTable";
import DeleteProductModal from "../../modal/DeleteProductModal";
import { useAppSelector } from "../../hooks/redux";
import { Product } from "../../types/Store";
import { Category } from "../Categories/CategoriesTypes";

export type ProductsListProps = unknown

const ProductsList: FC<ProductsListProps> = () => {
  const {current, currentStore} = useAppSelector(store => store.store)

  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsModified, setProductsModified] = useState<Product[]>(products);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

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
    const code = event.target.value
    setCategory(code)
    const filter = products.filter(item => item.category === code)
    setProductsModified(filter)
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
              <MenuItem
                key={item.id}
                value={item.code}
              >
                { item.title }
              </MenuItem>
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
