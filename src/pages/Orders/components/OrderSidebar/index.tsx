import React, { FC } from 'react';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import styles from "./OrderSidebar.module.scss";
import useWindowSize, { WindowSize } from "../../../../hooks/useWindowSize";
import { Divider, IconButton, Link, List, ListItem, Typography } from "@mui/material";
import { OrderInfo } from "../../../../types/Order";
import { Close } from "@mui/icons-material";
import Moment from "react-moment";
import OrderStatus from "../OrderStatus";
import ProductsInfoTable from "../ProductsInfoTable";

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
      minHeight: open ? '100vh' : "inherit",
      visibility: open ? "visible": "hidden",
      zIndex: 1000,
      mt: '-1px',
      borderTop: 1,
      borderColor: 'divider'
    },
  }

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
          <Typography component="h5">
            <b>#{data?.id}</b>
          </Typography>

          <IconButton onClick={onClose}>
            <Close/>
          </IconButton>
        </Box>

        <Box className={styles.container}>
          <Typography component="h6">
            <b>Детали</b>
          </Typography>

          <List className={styles.list}>
            <ListItem>
              <Typography>Дата и время</Typography>
              <Moment format="DD/MM/YYYY hh:mm" element="p">
                {data?.date}
              </Moment>
            </ListItem>

            <Divider/>

            <ListItem>
              <Typography>Клиент</Typography>
              <div>
                <Typography>{data?.client.name}</Typography>
                <Link
                  href={`tel:${data?.client.phone}`}
                >
                  {data?.client.phone}
                </Link>
              </div>
            </ListItem>

            <Divider/>

            <ListItem>
              <Typography>Статус заказа</Typography>
              <div>
                <OrderStatus type='warning'/>
              </div>
            </ListItem>

            <Divider/>

            <ListItem>
              <Typography>Сумма заказа</Typography>
              <Typography>{data?.amount}</Typography>
            </ListItem>
          </List>
        </Box>

        <Box
          className={styles.container}
          mt={3}
        >
          <Typography component="h6">
            <b>Список товаров</b>
          </Typography>

          {data
            ? <ProductsInfoTable data={data.products}/>
            : null}
        </Box>
      </Drawer>
    </Box>
  );
};

export default OrderSidebar;
