import React, { FC } from 'react';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import styles from "./Sidebar.module.scss";
import StoreCard from "../StoreCard";
import Toolbar from "@mui/material/Toolbar";
import Navigation from "../Navigation";
import useWindowSize, { WindowSize } from "../../hooks/useWindowSize";
import HeaderNavigation from "../HeaderNavigation";

export type SidebarProps =  {
  sidebarWidth: number,
  open: boolean,
  toggleOpen: () => void
}

const Sidebar: FC<SidebarProps> = (props) => {
  const {
    sidebarWidth,
    open,
    toggleOpen,
  } = props

  const windowSize: WindowSize = useWindowSize();
  const windowWidth = windowSize.width

  const type =
    windowWidth && windowWidth > 600
      ? 'permanent'
      : 'temporary'

  return (
    <Box
      component="nav"
      sx={{ width: { sm: sidebarWidth }, flexShrink: { sm: 0 } }}
      aria-label="navigation"
      className={styles.root}
    >
      <Drawer
        variant={type}
        open={open}
        onClose={() => toggleOpen()}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarWidth },
        }}
      >
        <Toolbar
          className={styles.header}
        >
          logo
        </Toolbar>

        <div className={styles.content}>
          <StoreCard />
          <Navigation toggleOpen={toggleOpen} />

          <Box
            sx={{
              mt: 7,
              display: {
                xs: 'flex',
                sm: 'none'
              }
            }}
          >
            <HeaderNavigation
              direction="column"
              spacing={0}
            />
          </Box>
        </div>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
