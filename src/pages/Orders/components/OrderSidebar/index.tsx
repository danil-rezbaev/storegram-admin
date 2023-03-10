import React, { FC } from 'react';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import styles from "./OrderSidebar.module.scss";
import useWindowSize, { WindowSize } from "../../../../hooks/useWindowSize";
import { IconButton, List, ListItem, Typography } from "@mui/material";
import { OrderInfo } from "../../OrdersTypes";
import { Close } from "@mui/icons-material";

export type OrderSidebarProps = {
  data: OrderInfo | null,
  open: boolean,
  onClose: () => void,
  width: number
}

const OrderSidebar: FC<OrderSidebarProps> = (props) => {
  const {
    data,
    open,
    onClose,
    width
  } = props

  const windowSize: WindowSize = useWindowSize();
  const windowWidth = windowSize.width
  const isDesktop = windowWidth && windowWidth > 600

  const sidebarWidth = isDesktop ? width : '320px'

  const drawerStyles = {
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: sidebarWidth,
      position: 'relative',
      height: '100%',
      minHeight: '100vh',
      zIndex: 1000,
      mt: '-1px',
      borderTop: 1,
      borderColor: 'divider'
    },
  }

  // const details = {
  //   ...data.
  // }

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: sidebarWidth },
        flexShrink: { sm: 0 },
    }}
      aria-label="navigation"
      className={styles.root}
    >
      <Drawer
        anchor={isDesktop ? 'right' : 'left'}
        variant={isDesktop ? 'persistent' : 'temporary'}
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={drawerStyles}
      >
        <Box className={styles.header}>
          <Typography component="h6">
            <b>{data?.id}</b>
          </Typography>

          <IconButton onClick={onClose}>
            <Close/>
          </IconButton>
        </Box>

        {/*<Divider/>*/}

        <div className={styles.container}>
          <Typography component="h6">
            <b>Детали</b>
          </Typography>

          <List>
            <ListItem>
              p
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Box>
  );
};

export default OrderSidebar;
