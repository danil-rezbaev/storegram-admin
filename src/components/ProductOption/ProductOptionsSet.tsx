import * as React from 'react';
import { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { Form, Formik } from 'formik'
import * as yup from "yup";
import { FieldsType, ProductOptionItem, ProductOptionType } from "./OptionsType";

export type ProductOptionSetProps = unknown

const ProductOptionSet: FC<ProductOptionSetProps> = (props) => {
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)

  const [priceChange, setPriceChange] = useState('')
  const [productOptionsSet, setProductOptionsSet] = useState<ProductOptionItem[]>([])

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceChange(event.currentTarget.value)
  }

  const formSubmit = () => {
    const dataFormat = {
      title,
      priceChange,
    }

    setProductOptionsSet(value => [...value, dataFormat])
  }

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <TextField
          id="product-title"
          variant="outlined"
          size="small"
          name="title"
          placeholder="Название опции"
          onChange={handleTitle}
          value={title}
          error={titleError}
          fullWidth
        />

        <TextField
          id="product-priceChange"
          variant="outlined"
          size="small"
          name="title"
          placeholder="Изменение цены, используйте - если цена должна уменьшится "
          onChange={handleTitle}
          value={title}
          error={titleError}
          fullWidth
        />
      </Stack>

      <Button
        variant="contained"
        size="large"
        type="submit"
        sx={{
          mt: 1.5
        }}
        fullWidth
      >
        Создать вариант выбора
      </Button>
    </Box>
  );
}

export default ProductOptionSet
