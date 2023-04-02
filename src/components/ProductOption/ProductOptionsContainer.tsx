import React, { FC, useState } from 'react';
import { ProductOptionItem, ProductOptionType } from "./OptionsType";
import { Box, Button, Stack } from "@mui/material";
import ProductOptionSet from "./ProductOptionsSet";
import styles from "./ProductOptions.module.scss";

export type ProductOptionsContainerProps = {
  data: ProductOptionType,
  addOptionValue: (arg1: ProductOptionType) => void,
  deleteOption: (id: string) => void,
  deleteOptionValue: (optionId: string, valueId: string) => void,
}

const ProductOptionsContainer: FC<ProductOptionsContainerProps> = (props) => {
  const {
    data,
    addOptionValue,
    deleteOption,
    deleteOptionValue
  } = props

  const [values, setValues] = useState<ProductOptionItem[]>(data.values)

  const handleDelete = (id: string) => {
    deleteOptionValue(data.id, id)
  }

  const addValues = (value: ProductOptionItem) => {
    setValues(values => [...values, value])

    const dataFormat = {
      ...data,
      values: [...values, value],
    }

    addOptionValue(dataFormat)
  }

  return (
    <div style={{
      marginBottom: '16px'
    }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        padding="10px 0"
      >
        <b>{data.title}</b>

        {data.optionType === 'checkbox'
          ? <p>Несколько вариантов выбора</p>
          : <p>Один вариант выбора</p> }

        <Button onClick={() => deleteOption(data.id)}>
          удалить
        </Button>
      </Stack>

      <div
        style={{
          borderLeft: '1px dashed gray',
          paddingLeft: '16px',
          marginLeft: '16px'
        }}
      >
        <Box>
          {data.values.map((item) => (
            <Box
              className={styles.item}
            >
              <span className={styles.checkbox}>

              </span>
              <p>{item.title}</p>

              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  justifySelf: 'end'
                }}
              >
                <p>{item.priceChange} RUB</p>

                {/*<Button onClick={() => handleDelete(item.id)}>*/}
                {/*  удалить*/}
                {/*</Button>*/}
              </Stack>
            </Box>
          ))}

          <ProductOptionSet addValues={addValues} />
        </Box>
      </div>
    </div>
  );
};

export default ProductOptionsContainer;
