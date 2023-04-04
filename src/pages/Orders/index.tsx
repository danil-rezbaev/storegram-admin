import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import PageContent from "../../components/PageContent";
import { Tab } from "@mui/material";
import { TabContext, TabList } from '@mui/lab';
import OrdersTable from "./components/OrdersTable";
import OrderSidebar from "./components/OrderSidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeOrderInfoModal } from "../../store/slices/orderInfoModalSlice";
import { OrderInfo } from "../../types/Order";
import axios from "../../axios";

export type OrdersProps = unknown

const Orders: FC<OrdersProps> = () => {
  const [value, setValue] = useState('all');

  const [ordersList, setOrdersList] = useState<OrderInfo[]>([])
  const {currentStore} = useAppSelector(store => store.store)

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

  const getOrders = async () => {
    const { data } = await axios.get('/orders')

    if (data) {
      setOrdersList(data)
    }
  }

  useEffect(() => {
    getOrders()
  }, [currentStore])

  return (
    <Box
      sx={{
        display: open ? `grid` : 'block',
        gridTemplateColumns: open ? `1fr ${sidebarWidth}px` : '1fr'
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
        <OrdersTable data={ordersList} />
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
