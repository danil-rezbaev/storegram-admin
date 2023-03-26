import React from 'react';
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { closeDeleteCategoryModal } from "../store/slices/deleteCategoryModal";
import CustomModal from "../components/Modal";
import { closeDeleteProductModal } from "../store/slices/deleteProductModal";
import axios from "../axios";
import { openFloatAlert } from "../store/slices/floatAlertSlice";
import { deleteProduct } from "../store/slices/storeSlice";

const DeleteCategoryModal = () => {
  const dispatch = useAppDispatch()
  const { deleteCategoryModal, store } = useAppSelector(store => store)
  const {current} = store

  const {
    id,
    title,
    visible,
  } = deleteCategoryModal

  const handleClose = () => {
    dispatch(closeDeleteCategoryModal())
  }

  const handleDelete = async () => {
    dispatch(closeDeleteProductModal())

    if(!current) {
      return
    }

    try {
      const data = await axios.delete(`/category/${id}`)

      if (data.status === 200) {
        dispatch(openFloatAlert({
          title: `Категория успешно удалена`,
          type: "success"
        }))

        dispatch(deleteProduct({id}))
      } else {
        dispatch(openFloatAlert({
          title: `Ошибка при удалении категории`,
          type: "error"
        }))
      }
    } catch (e) {
      dispatch(openFloatAlert({
        title: `Ошибка при удалении категории`,
        type: "error"
      }))
    }
  }

  return (
    <CustomModal open={visible} onClose={handleClose}>
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
        Вы действительно хотите удалить категорию <b>{title}</b>?
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

export default DeleteCategoryModal;
