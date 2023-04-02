import * as React from 'react';
import { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Stack, TextField } from '@mui/material';
import { ProductOptionItem } from "./OptionsType";
import { nanoid } from "@reduxjs/toolkit";

export type ProductOptionSetProps = {
  addValues: (arg1: ProductOptionItem) => void
}

const ProductOptionSet: FC<ProductOptionSetProps> = (props) => {
  const {
    addValues
  } = props

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [priceChange, setPriceChange] = useState('')
  const [priceChangeError, setPriceChangeError] = useState(false)

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceChange(event.currentTarget.value)
  }

  const formSubmit = () => {
    if (!title) {
      setTitleError(true)
    } else {
      setTitleError(false)
    }

    if (!priceChange) {
      setPriceChangeError(true)
    } else {
      setPriceChangeError(false)
    }

    if (!title || !priceChange) {
      return
    }

    const id = nanoid()

    const dataFormat = {
      id: id,
      title,
      priceChange: +priceChange,
    }

    addValues(dataFormat)
    setTitle('')
    setPriceChange('')
  }

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <TextField
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
          variant="outlined"
          size="small"
          type="number"
          name="priceChange"
          placeholder="Изменение цены, используйте - если цена должна уменьшится "
          onChange={handlePriceChange}
          value={priceChange}
          error={priceChangeError}
          fullWidth
        />
      </Stack>

      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 1.5
        }}
        onClick={formSubmit}
        fullWidth
      >
        Создать вариант выбора
      </Button>
    </Box>
  );
}

export default ProductOptionSet
