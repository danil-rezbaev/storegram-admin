import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import axios from "../../axios";
import { openFloatAlert } from "../../store/slices/floatAlertSlice";

export type SettingsProps = unknown

const Settings: FC<SettingsProps> = () => {
  const {current} = useAppSelector(store => store.store)

  const validationSchema = yup.object().shape({
    title: yup.string().required("Поле обязательно к заполнению"),
  })

  const dispatch = useAppDispatch()

  const formSubmit = async (value: any) => {
    try {
      const data = await axios.patch('/store',
        { value })

      if (data.status === 200) {
        dispatch(openFloatAlert({
          title: `Магазин успешно отредактирован`,
          type: "success"
        }))
      } else {
        dispatch(openFloatAlert({
          title: `Ошибка при отредактировании`,
          type: "error"
        }))
      }
    } catch (e) {
      dispatch(openFloatAlert({
        title: `Ошибка при отредактировании`,
        type: "error"
      }))
    }
  }

  const initialValue = {
    title: current?.title ?? '',
  }

  return (
    <PageContent title="Настройки">
      <Formik
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
                <Box>
                  <Typography
                    variant="subtitle1"
                    mt={1.5}
                  >
                    Заголовок магазина
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
                </Box>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Сохранить
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </PageContent>
  );
}

export default Settings
