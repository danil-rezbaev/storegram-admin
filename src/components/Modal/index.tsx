import * as React from 'react';
import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Modal } from "@mui/material";

export type CustomModalProps = {
  open: boolean,
  onClose: () => void,
  maxWidth?: number,
  children: ReactNode
}

const CustomModal: FC<CustomModalProps> = (props) => {
  const {
    open,
    onClose,
    maxWidth = 500,
    children
  } = props

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 16px)',
    maxWidth: `${maxWidth}px`,
    bgcolor: 'background.paper',
    border: 0,
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
}

export default CustomModal
