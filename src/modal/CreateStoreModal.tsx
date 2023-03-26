import React from 'react';
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Form, Formik } from 'formik';
import * as yup from "yup";
import CustomModal from "../components/Modal";
import { closeCreateStoreModal } from "../store/slices/createStoreModal";
import axios from "../axios";
import { openFloatAlert } from "../store/slices/floatAlertSlice";
import { changeStore, initializeStores } from "../store/slices/storeSlice";

const CreateStoreModal = () => {
  const dispatch = useAppDispatch()
  const store = useAppSelector(store => store.createStoreModal)
  const storeStore = useAppSelector(store => store.store)

  const handleClose = () => {
    dispatch(closeCreateStoreModal())
  }

  const formSubmit = async (value: any) => {
    const data = await axios.post('/store/create', value)

    if (data.status === 200) {
      dispatch(openFloatAlert({
        title: "Магазин успешно создан",
        type: "success"
      }))

      const format = [
        ...storeStore.default,
      {
        title: data.data.title,
        id: data.data._id
      }
    ]

      dispatch(initializeStores({data: format}))
      dispatch(changeStore({id: data.data._id}))
    } else {
      dispatch(openFloatAlert({
        title: "Ошибка при созданиии магазина",
        type: "error"
      }))
    }

    handleClose()
  }

  const validationSchema = yup.object().shape({
    title: yup.string().required(),
  })

  const initialValue = {
    title: '',
  }

  return (
    <CustomModal
      open={store.visible}
      onClose={handleClose}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fw: 'bold',
          marginBottom: '16px'
        }}
      >
        Создать магазин
      </Typography>
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
            <TextField
              id="title"
              variant="outlined"
              size="small"
              name="title"
              label="Название"
              onChange={handleChange}
              value={values.title}
              error={!!errors.title}
              fullWidth
            />

            <Box mt={2} display="flex" gap={2}>
              <Button
                color="success"
                variant="contained"
                type="submit"
              >
                Создать
              </Button>

              <Button
                color="inherit"
                variant="outlined"
                onClick={handleClose}
              >
                Отменить
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default CreateStoreModal;
