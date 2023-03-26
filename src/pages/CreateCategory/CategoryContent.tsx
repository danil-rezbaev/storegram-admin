import React, { FC } from 'react';
import { Box, Button, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import { Category } from "../Categories/CategoriesTypes";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import axios from "../../axios";
import { openFloatAlert } from "../../store/slices/floatAlertSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";

export type ProductContentProps = {
  category?: Category,
  type: 'create' | 'update'
}

const CategoryContent: FC<ProductContentProps> = (props) => {
  const {
    type
  } = props

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
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
    const valueFormat = {
      ...value,
      code: generateCode(value.title)
    }

    if(!current) {
      return
    }

    try {
      const data = await axios.post('/category',
        { category: valueFormat })

      if (data.status === 200) {
        dispatch(openFloatAlert({
          title: `Категория успешно ${type === 'create' ? 'создана' : 'изменена'}`,
          type: "success"
        }))
        navigate('/categories')
      } else {
        dispatch(openFloatAlert({
          title: `Ошибка при ${type === 'create' ? 'создании' : 'изменении'} категории`,
          type: "error"
        }))
      }
    } catch (e) {
      dispatch(openFloatAlert({
        title: `Ошибка при ${type === 'create' ? 'создании' : 'изменении'} категории`,
        type: "error"
      }))
    }
  }

  const initial = {
    title: '',
    code: '',
    active: true
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
