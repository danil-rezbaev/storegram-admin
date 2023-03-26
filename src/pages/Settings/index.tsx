import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import * as yup from "yup";
// import { Form, Formik } from "formik";
// import {
//   Box, Button,
//   FormControlLabel,
//   Grid,
//   InputAdornment,
//   MenuItem,
//   Select,
//   Switch,
//   TextField,
//   Typography
// } from "@mui/material";
// import { CurrencyRuble } from "@mui/icons-material";

export type SettingsProps = unknown

const Settings: FC<SettingsProps> = () => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Поле обязательно к заполнению"),
    description: yup.string().required("Поле обязательно к заполнению"),
    price: yup.string().required("Поле обязательно к заполнению"),
    category: yup.string().required("Поле обязательно к заполнению"),
  })

  const boxStyles = {
    boxShadow: '0px 6px 6px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: 5,
    padding: '30px 20px',
    sm: {
      padding: '40px 30px',
    }
  }

  const formSubmit = (value: any) => {
    console.log(value)
  }

  const initialValue = {
    title: ''
  }

  return (
    <PageContent title="Настройки">
{/*      <Formik
        initialValues={initialValue}
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
                  <Typography
                    variant="subtitle1"
                    mt={1.5}
                  >
                    Заголовок магазина
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
      </Formik>*/}
    </PageContent>
  );
}

export default Settings
