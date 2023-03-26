import React, { FC, useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { CurrencyRuble } from "@mui/icons-material";
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import { Category, Product } from "../../types/Store";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import axios from "../../axios";
import { openFloatAlert } from "../../store/slices/floatAlertSlice";
import UploadImage from "../../components/UploadImage";
import { UploadFile } from "antd/es/upload/interface";
import { UploadProps, RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
import { addProduct, editProduct } from "../../store/slices/storeSlice";

export type ProductContentProps = {
  product?: Product,
  type: 'create' | 'update'
}

const ProductContent: FC<ProductContentProps> = (props) => {
  const {
    product,
    type
  } = props

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const fileListHandler: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {current, currentStore} = useAppSelector(store => store.store)
  const categories: Category[] = currentStore?.categories ?? []

  const defaultCategory = {
    code: 'default',
    title: 'По умолчанию',
    active: true,
  }
  const categoriesFormat: Category[] = [defaultCategory, ...categories]

  const validationSchema = yup.object().shape({
    title: yup.string().required("Поле обязательно к заполнению"),
    description: yup.string().required("Поле обязательно к заполнению"),
    price: yup.string().required("Поле обязательно к заполнению"),
  })

  const boxStyles = {
    boxShadow: '0px 6px 6px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: 5,
    padding: '30px 20px',
    sm: {
      padding: '40px 30px',
    }
  }

  const formSubmit = async (value: any) => {
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('files[]', file as RcFile);
    });

    console.log({formData})

    const imagesResponse = await axios.post('/upload', formData)

    console.log(imagesResponse.data)

    const valueFormat = {
      ...value,
      price: {
        currency: 'rub',
        value: value.price ?? 0
      },
    }

    if(!current) {
      return
    }

    try {
      const data = await axios.post('/product',
        { product: valueFormat })

      if (data.status === 200) {
        dispatch(openFloatAlert({
          title: `Товар успешно ${type === 'create' ? 'создан' : 'изменен'}`,
          type: "success"
        }))

        if(type === 'create') {
          dispatch(addProduct({product: valueFormat}))
        } else if (type === 'update') {
          dispatch(editProduct({product: valueFormat}))
        }

        navigate('/products-list')
      } else {
        dispatch(openFloatAlert({
          title: `Ошибка при ${type === 'create' ? 'создании' : 'изменении'} товара`,
          type: "error"
        }))
      }
    } catch (e) {
      dispatch(openFloatAlert({
        title: `Ошибка при ${type === 'create' ? 'создании' : 'изменении'} товара`,
        type: "error"
      }))
    }
  }

  const initialValues = {
    ...product,
    price: product?.price.value ?? ''
  }

  return (
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Box sx={boxStyles}>
                <Typography variant="subtitle1">
                  Изображение
                </Typography>

                <UploadImage
                  fileList={fileList}
                  fileListHandler={fileListHandler}
                />

                <Typography
                  variant="subtitle1"
                  mt={1.5}
                >
                  Название
                </Typography>
                <TextField
                  id="product-title"
                  variant="outlined"
                  size="small"
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                  error={!!errors.title}
                  fullWidth
                />

                <Typography
                  variant="subtitle1"
                  mt={1.5}
                >
                  Описание
                </Typography>
                <TextField
                  id="product-description"
                  variant="outlined"
                  multiline={true}
                  minRows={6}
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  error={!!errors.description}
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={boxStyles}>
                <FormControlLabel
                  value="bottom"
                  control={
                    <Switch
                      color="primary"
                      name="active"
                      onChange={handleChange}
                      value={values.active}
                    />
                  }
                  label="Включить"
                  labelPlacement="end"
                />

                <Typography
                  variant="subtitle1"
                  mt={1.5}
                >
                  Цена
                </Typography>
                <TextField
                  id="product-price"
                  variant="outlined"
                  InputProps={{
                    startAdornment:
                      <InputAdornment position="start">
                        <CurrencyRuble fontSize="small"/>
                      </InputAdornment>,
                  }}
                  type="number"
                  size="small"
                  name="price"
                  onChange={handleChange}
                  value={values.price}
                  error={!!errors.price}
                  fullWidth
                />

                <Typography
                  variant="subtitle1"
                  mt={1.5}
                >
                  Категория
                </Typography>

                <Select
                  // value={categories}
                  // onChange={handleSelect}
                  name="category"
                  onChange={handleChange}
                  value={values.category}
                  error={!!errors.category}
                  defaultValue={categoriesFormat[0].code}
                  size="small"
                  fullWidth
                >
                  {categoriesFormat.map((item) => (
                    <MenuItem value={item.code}>{ item.title }</MenuItem>
                  ))}
                </Select>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                  >
                    Сохранить
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Form>
        )}
    </Formik>
  );
};

export default ProductContent;
