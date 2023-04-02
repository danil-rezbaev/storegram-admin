import React, { FC, useState } from 'react';
import { Box, Button, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { useAppSelector } from "../../hooks/redux";
import { nanoid } from "@reduxjs/toolkit";
import { Category } from "../../pages/Categories/CategoriesTypes";

export type CategoryContentProps = {
  category?: Category,
  onSubmit: (category: Category) => void
}

const CategoryContent: FC<CategoryContentProps> = (props) => {
  const {
    category,
    onSubmit
  } = props

  const [active, setActive] = useState<boolean>(category?.active ?? true)

  console.log({active})

  const activeHandler = () => {
    setActive((value) => !value)
  }

  const {current} = useAppSelector(store => store.store)

  const validationSchema = yup.object().shape({
    title: yup.string().required("Поле обязательно к заполнению"),
  })

  const boxStyles = {
    boxShadow: '0px 6px 6px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: 5,
    padding: '30px 20px',
    sm: {
      padding: '40px 30px',
    }
  }

  // @ts-ignore
  let cyrillicToTranslit = new CyrillicToTranslit({preset: "ru"});

  const generateCode = (title: string | undefined): string => {
    if(!title) {
      return ''
    }

    return cyrillicToTranslit.transform(title, '_').toLowerCase();
  }

  const formSubmit = async (value: any) => {
    const valueFormat: Category = {
      id: category?.id ?? nanoid(),
      active: active,
      title: value.title,
      code: generateCode(value.title)
    }

    if(!current) {
      return
    }

    onSubmit(valueFormat)
  }

  const initial = category ?? {
    title: '',
    code: ''
  }

  return (
    <Formik
      initialValues={initial}
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
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      name="active"
                      onClick={activeHandler}
                      defaultChecked
                    />
                  }
                  value={active}
                  label="Активно"
                  labelPlacement="end"
                />

                <Typography
                  variant="subtitle1"
                  mt={1.5}
                >
                  Название
                </Typography>
                <TextField
                  id="category-title"
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
                  Код
                </Typography>
                <TextField
                  id="category-title"
                  variant="outlined"
                  size="small"
                  name="code"
                  onChange={handleChange}
                  value={generateCode(values.title)}
                  error={!!errors.code}
                  fullWidth
                  disabled
                />

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

export default CategoryContent;
