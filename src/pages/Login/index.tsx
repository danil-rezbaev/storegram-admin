import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchLogin } from "../../store/slices/authSlice";
import { openFloatAlert } from "../../store/slices/floatAlertSlice";

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector(store => store.auth.status)

  useEffect(() => {
    if(isAuth) {
      navigate('/')
    }
  }, [])

  const validationSchema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required(),
  })

  const formSubmit = async (value: any) => {
    const data = await dispatch(fetchLogin(value))

    if (!data.payload) {
      dispatch(openFloatAlert({
        type: 'error',
        title: "Неверный логин или пароль",
      }))
      return
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
      navigate('/')
    }
  }

  const initialValue = {
    login: '',
    password: '',
  }

  const styles = {
    width: '100%',
    maxWidth: 450,
    textAlign: 'center',
    boxShadow: '0px 6px 6px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: 5,
    padding: '30px 20px',
    marginTop: '150px',
    sm: {
      padding: '40px 30px',
    }
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={styles}
      >
        <Typography variant="h4">Войти</Typography>

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
              <Box mt={1}>
                <TextField
                  id="login"
                  variant="outlined"
                  size="small"
                  name="login"
                  label="Логин"
                  onChange={handleChange}
                  value={values.login}
                  error={!!errors.login}
                  fullWidth
                />

                <Box mt={2}>
                  <TextField
                    id="password"
                    variant="outlined"
                    size="small"
                    name="password"
                    label="Пароль"
                    onChange={handleChange}
                    value={values.password}
                    error={!!errors.password}
                    fullWidth
                  />
                </Box>

                <Box mt={3}>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                  >
                    Отправить
                  </Button>
                </Box>

                <Box mt={1}>
                  <Link to="/signup">Нет аккаунта? Зарегистрироваться</Link>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

export default Login;
