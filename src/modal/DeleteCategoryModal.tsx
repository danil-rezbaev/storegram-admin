import React from 'react';
import { Button, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { closeDeleteCategoryModal } from "../store/deleteCategoryModal";

const DeleteCategoryModal = () => {
  const dispatch = useAppDispatch()
  const store = useAppSelector(store => store.deleteCategoryModal)

  const {
    title,
    visible,
  } = store

  const handleClose = () => {
    //axios.delete
    dispatch(closeDeleteCategoryModal())
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    border: 0,
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={visible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
      </Box>
    </Modal>
  );
};

export default DeleteCategoryModal;
