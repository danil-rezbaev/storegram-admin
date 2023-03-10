import * as React from 'react';
import { FC, ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from "../Header";
import Sidebar from "../Sidebar";

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
        {children}
      </Box>
    </Box>
  );
}

export default Base
