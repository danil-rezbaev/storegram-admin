import * as React from 'react';
import { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { FieldsType, ProductOptionType } from "./OptionsType";
import ProductOptionsContainer from "./ProductOptionsContainer";

export type ProductOptionProps = unknown

const ProductOption: FC<ProductOptionProps> = (props) => {
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)

  const [type, setType] = useState<FieldsType>('checkbox')
  const [productOptions, setProductOptions] = useState<ProductOptionType[]>([])

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
      title,
      type,
      values: []
    }

    setProductOptions(value => [...value, dataFormat])
  }

  return (
    <Box>
      <Box>
        {productOptions.map(item => (
          <div>
            <b>{item.title}</b>
            <p>{item.type}</p>
            <div>
              <ProductOptionsContainer values={item.values} />
            </div>
          </div>
        ))}
      </Box>

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
        type="submit"
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
