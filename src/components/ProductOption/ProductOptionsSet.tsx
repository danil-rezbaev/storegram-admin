import * as React from 'react';
import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Stack, TextField } from '@mui/material';
import { Form, Formik } from 'formik'
import * as yup from "yup";
import { ProductOptionItem } from "./OptionsType";

export type ProductOptionSetProps = unknown

const ProductOptionSet: FC<ProductOptionSetProps> = (props) => {
  const [productOptionSet, setProductOptionSet] = useState<ProductOptionItem[]>([])

  const validationSchema = yup.object().shape({
    title: yup.string().required(),
  })

  const initialValues: ProductOptionItem = {
    title: '',
    priceChange: ''
  }

  const formSubmit = async (value: ProductOptionItem) => {
    const {title, priceChange} = value

    const dataFormat = {
      title,
      priceChange,
    }

    setProductOptionSet(value => [...value, dataFormat])
  }

  return (
    <Box
      sx={{ display: 'flex' }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={formSubmit}
        validationSchema={validationSchema}
        validateOnChange
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, touched }) => (
          <Form
            className="form"
            onSubmit={handleSubmit}
            noValidate={true}
          >
            <Stack direction="row" spacing={2}>
              <TextField
                id="product-title"
                variant="outlined"
                size="small"
                name="title"
                placeholder="Название опции"
                onChange={handleChange}
                value={values.title}
                error={!!errors.title}
                fullWidth
              />

              <TextField
                id="product-priceChange"
                variant="outlined"
                size="small"
                name="title"
                placeholder="Изменение цены, используйте - если цена должна уменьшится "
                onChange={handleChange}
                value={values.priceChange}
                error={!!errors.priceChange}
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
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ProductOptionSet
