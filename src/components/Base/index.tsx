import * as React from 'react';
import { FC, ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useAppSelector } from "../../hooks/redux";
import { Typography } from "@mui/material";

export type BaseProps = {
  children: ReactNode
}

const Base: FC<BaseProps> = (props) => {
  const {
    children
  } = props

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(value => !value);
  };

  const sidebarWidth = 300;
  const store = useAppSelector(store => store.auth)
  const { current } = useAppSelector(store => store.store)

  if(!store.status) {
    return (
      <>{children}</>
    )
  }

  return (
    <Box
      sx={{ display: 'flex' }}
    >
      <Header sidebarWidth={sidebarWidth} onClick={handleDrawerToggle} />
      <Sidebar
        sidebarWidth={sidebarWidth}
        toggleOpen={handleDrawerToggle}
        open={mobileOpen}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            xs: '100%',
            sm: `calc(100% - ${sidebarWidth}px)`
          },
          padding: 0
        }}
      >
        <Toolbar />
        {current ? children : (
          <Box
            textAlign="center"
            mt={2}
          >
            <Typography variant="subtitle1">Контент недоступен, сперва создайте магазин</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Base
