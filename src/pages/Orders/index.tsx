import * as React from 'react';
import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import PageContent from "../../components/PageContent";
import { Tab } from "@mui/material";
import { TabContext, TabList } from '@mui/lab';
import { orderData } from "../../layout/pages/order/orders";
import OrdersTable from "./components/OrdersTable";
import OrderSidebar from "./components/OrderSidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeOrderInfoModal } from "../../store/OrderInfoModalSlice";

export type OrdersProps = unknown

const Orders: FC<OrdersProps> = () => {
  const [value, setValue] = useState('all');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const orderInfoModal = useAppSelector(store => store.orderInfoModal)

  const open = orderInfoModal.visible
  const data = orderInfoModal.data
  const dispatch = useAppDispatch()

  const closeInfoModal = () => {
    dispatch(closeOrderInfoModal())
  }

  const sidebarWidth = 400

  return (
    <Box
      sx={{
        sm: {
          display: 'grid',
          gridTemplateColumns: `1fr ${sidebarWidth}px`
        }
      }}
    >
      <PageContent
        title="Заказы"
        style={{
          sm: {
            marginRight: !open ? `-${sidebarWidth}px` : 0,
            transition: 'margin 150ms ease-out 0ms',
          }
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Все" value="all" />
              <Tab label="Оплаченные" value="success" />
              <Tab label="Неоплаченные" value="cancel" />
            </TabList>
          </Box>
        </TabContext>
        <OrdersTable data={orderData} />
      </PageContent>

      <OrderSidebar
        data={data}
        open={open}
        onClose={closeInfoModal}
        width={sidebarWidth}
      />
    </Box>
  );
}

export default Orders
