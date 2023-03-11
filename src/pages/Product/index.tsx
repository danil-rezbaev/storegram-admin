import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import { SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type ProductsProps = unknown

const Products: FC<ProductsProps> = () => {
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
      /
    </PageContent>
  );
}

export default Products
