import React, { FC } from 'react';
import { ProductOptionItem } from "./OptionsType";
import { Box, Button, Stack } from "@mui/material";
import ProductOptionSet from "./ProductOptionsSet";

export type ProductOptionsContainerProps = {
  values: ProductOptionItem[]
}

const ProductOptionsContainer: FC<ProductOptionsContainerProps> = (props) => {
  const {values} = props

  const handleDelete = () => {}

  return (
    <Box>
      {values.map((item) => (
        <Stack direction="row" spacing={2}>
          <p>{item.title}</p>
          <p>{item.priceChange}</p>

          <Button onClick={handleDelete}>
            удалить
          </Button>
        </Stack>
      ))}

      <ProductOptionSet />
    </Box>
  );
};

export default ProductOptionsContainer;
