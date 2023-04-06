import React, { FC, useEffect, useMemo, useState } from 'react';
import { Form, Formik } from "formik";
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
import UploadImage from "../UploadImage";
import ProductOptions from "../ProductOption";
import { CurrencyRuble } from "@mui/icons-material";
import * as yup from "yup";
import { ProductOptionType } from "../ProductOption/OptionsType";
import { UploadFile } from "antd/es/upload/interface";
import { nanoid } from "@reduxjs/toolkit";
import { UploadProps } from "antd/es/upload";
import { useAppSelector } from "../../hooks/redux";
import { Category } from "../../pages/Categories/CategoriesTypes";
import axios from "../../axios";
import { Product } from "../../types/Store";
import { SERVER_URL } from "../../const";

export type ProductContentProps = {
  product?: Product,
  onSubmit: (data: Product) => void
}

const ProductContent: FC<ProductContentProps> = (props) => {
  const {
    product,
    onSubmit
  } = props

  const [active, setActive] = useState<boolean>(product?.active ?? true)
  const [productOptions, setProductOptions] = useState<ProductOptionType[]>( product?.options ?? [])

  const getOptions = (data: ProductOptionType[]) => {
    setProductOptions(data)
  }

  const activeHandler = () => {
    setActive((value) => !value)
  }

  const defaultImages = useMemo((): UploadFile[] => {
    if (product?.images) {
      return product.images.map(item => (
        {
          uid: nanoid(),
          name: 'image.png',
          status: 'done',
          url: `${SERVER_URL}/${item}`,
        }
      ))
    }

    return []
  }, [])

  const [fileList, setFileList] = useState<UploadFile[]>(defaultImages);
  const [newFileList, setNewFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (newFileList.length) {
      setFileList(newFileList)
    }
  }, [newFileList])

  const fileListHandler: UploadProps['onChange'] = (data ) => {
    if(data.fileList) {
      try {
        setNewFileList(data.fileList);
      } catch (err) {
        console.warn(err)
      }
    }
  }

  const validationSchema = yup.object().shape({
    title: yup.string().required("Поле обязательно к заполнению"),
    price: yup.number().required("Поле обязательно к заполнению"),
  })

  const boxStyles = {
    boxShadow: '0px 6px 6px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: 5,
    padding: '30px 20px',
    sm: {
      padding: '40px 30px',
    }
  }

  const {current, currentStore} = useAppSelector(store => store.store)
  const categories: Category[] = currentStore?.categories ?? []

  const formSubmit = async (value: any) => {
    try {
        const uploadImages = async () => {
          const formData = new FormData();

          newFileList.forEach((file) => {
            formData.append('image', file.originFileObj as File);
          });

          const imagesResponse = await axios.post(`/upload`, formData)

          return imagesResponse.data
        }

        const imagesFormat = await uploadImages()

        if (!current) {
          return
        }

        const contentFormat: Product = {
          ...value,
          active,
          options: productOptions,
          images: [],
          category: value.category?.code
        }

        const dataFormat: Product = newFileList.length ? {
          ...contentFormat,
          images: imagesFormat.images,
        } : contentFormat

        onSubmit(dataFormat)
      } catch (err) {
      console.warn(err)
    }
  }

  const initialValues = product ?? {
    title: '',
    description: '',
    price: '',
    hint: '',
    category: categories[0] ?? '',
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
                  variant="outlined"
                  multiline={true}
                  minRows={6}
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  error={!!errors.description}
                  fullWidth
                />

                <Typography
                  variant="subtitle1"
                  mt={1.5}
                >
                  Подсказка
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  name="hint"
                  onChange={handleChange}
                  value={values.hint}
                  error={!!errors.hint}
                  fullWidth
                />

                <Typography
                  variant="subtitle1"
                  mt={1.5}
                >
                  Опции
                </Typography>
                <ProductOptions
                  values={productOptions}
                  getOptions={getOptions}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={boxStyles}>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      name="active"
                      onClick={activeHandler}
                      checked={active}
                      defaultChecked
                    />
                  }
                  label="Активно"
                  labelPlacement="end"
                />

                <Typography
                  variant="subtitle1"
                  mt={1.5}
                >
                  Цена
                </Typography>
                <TextField
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
                  name="category"
                  onChange={handleChange}
                  value={values.category}
                  error={!!errors.category}
                  size="small"
                  fullWidth
                >
                  {categories.map((item) => (
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
