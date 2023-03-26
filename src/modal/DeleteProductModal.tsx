import React from 'react';
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { closeDeleteProductModal } from "../store/slices/deleteProductModal";
import CustomModal from "../components/Modal";
import { deleteProduct } from "../store/slices/storeSlice";
import axios from "../axios";
import { openFloatAlert } from "../store/slices/floatAlertSlice";

const DeleteProductModal = () => {
  const dispatch = useAppDispatch()
  const { deleteProductModal, store } = useAppSelector(store => store)
  const {current} = store

  const {
    id,
    title,
    visible,
  } = deleteProductModal

  const handleClose = () => {
    dispatch(closeDeleteProductModal())
  }

  const handleDelete = async () => {
    dispatch(closeDeleteProductModal())

    if(!current) {
      return
    }

    try {
      const data = await axios.delete(`/product/${id}`)

      if (data.status === 200) {
        dispatch(openFloatAlert({
          title: `Товар успешно удален`,
          type: "success"
        }))

        dispatch(deleteProduct({id: id}))
      } else {
        dispatch(openFloatAlert({
          title: `Ошибка при удалении товара`,
          type: "error"
        }))
      }
    } catch (e) {
      dispatch(openFloatAlert({
        title: `Ошибка при удалении товара`,
        type: "error"
      }))
    }
  }

  return (
    <CustomModal
      open={visible}
      onClose={handleClose}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fw: 'bold'
        }}
      >
        Удалить
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        mt={1}
        lineHeight={1.25}
      >
        Вы действительно хотите удалить товар <b>{title}</b>?
      </Typography>

      <Box mt={2} display="flex" gap={2}>
        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
        >
          Удалить
        </Button>

        <Button
          color="inherit"
          variant="outlined"
          onClick={handleClose}
        >
          Отменить
        </Button>
      </Box>
    </CustomModal>
  );
};

export default DeleteProductModal;
