import * as React from 'react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { FieldsType, ProductOptionType } from "./OptionsType";
import ProductOptionsContainer from "./ProductOptionsContainer";
import { nanoid } from "@reduxjs/toolkit";

export type ProductOptionProps = {
  values: ProductOptionType[],
  getOptions: (arg: ProductOptionType[]) => void
}

const ProductOption: FC<ProductOptionProps> = (props) => {
  const {
    values,
    getOptions
  } = props

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)

  const [type, setType] = useState<FieldsType>('checkbox')
  const [productOptions, setProductOptions] = useState<ProductOptionType[]>(values)

  useEffect(() => {
    getOptions(productOptions)
  }, [productOptions])

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const handleType = (event: SelectChangeEvent<FieldsType>) => {
    if (event.target) {
      setType(event.target.value as FieldsType)
    }
  }

  const formSubmit = () => {
    const dataFormat = {
      id: nanoid(),
      title,
      optionType: type,
      values: []
    }

    if(!title) {
      setTitleError(true)
      return
    } else {
      setTitleError(false)
    }

    setProductOptions(value => [...value, dataFormat])
    setTitle('')
  }

  const addOptionValue = (data: ProductOptionType) => {
    const modifyList = productOptions.map(item => {
      if (item.id === data.id) {
        item.values = data.values
      }
      return item
    })

    setProductOptions(modifyList)
  }


  const deleteOption = (id: string) => {
    const filterList = productOptions.filter(item => item.id !== id)
    setProductOptions(filterList)
  }

  const deleteOptionValue = (optionId: string, valueId: string) => {
    const modifyList = productOptions.map(item => {
      if(item.id === optionId) {
        item.values.map(value => {
          if (value.id !== valueId) {
            return item
          }
        })
      }
      return item
    })

    setProductOptions(modifyList)
  }

  return (
    <Box>
      <Box>
        {productOptions.map(item => (
          <ProductOptionsContainer
            key={item.id}
            data={item}
            addOptionValue={addOptionValue}
            deleteOption={deleteOption}
            deleteOptionValue={deleteOptionValue}
          />
        ))}
      </Box>

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

        <Select
          name="type"
          onChange={handleType}
          value={type}
          size="small"
          fullWidth
        >
          <MenuItem value="checkbox">Несколько вариантов выбора</MenuItem>
          <MenuItem value="radio">Один вариант выбора</MenuItem>
        </Select>
      </Stack>

      <Button
        variant="contained"
        size="large"
        onClick={formSubmit}
        sx={{
          mt: 1.5
        }}
        fullWidth
      >
        Создать опцию
      </Button>
    </Box>
  );
}

export default ProductOption
