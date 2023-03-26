import * as React from 'react';
import { FC, SyntheticEvent } from 'react';
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeFloatAlert } from "../../store/slices/floatAlertSlice";

export type FloatAlertProps = unknown

const FloatAlert: FC<FloatAlertProps> = () => {
  const store = useAppSelector(store => store.floatAlert)
  const {
    title,
    type,
    visible
  } = store

  const dispatch = useAppDispatch()

  const handleClose = (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeFloatAlert())
  };

  return (
    <Snackbar open={visible} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={type}>
        {title}
      </Alert>
    </Snackbar>
  );
}

export default FloatAlert
