import React, { FC } from 'react';
import { ProductOptionItem } from "./OptionsType";
import { Box, Button } from "@mui/material";

export type ProductOptionsContainerProps = {
  values: ProductOptionItem[]
}

const ProductOptionsContainer: FC<ProductOptionsContainerProps> = (props) => {
  const {values} = props

  const handleDelete = () => {}

  return (
    <Box>
      {values.map((item) => (
        <div>
          <p>{item.title}</p>
          <p>{item.priceChange}</p>

          <Button onClick={handleDelete}>
            удалить
          </Button>
        </div>
      ))}
    </Box>
  );
};

export default ProductOptionsContainer;
