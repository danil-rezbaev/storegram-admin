import React, { FC } from 'react';
import styles from "./Header.module.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from '@mui/material';
import UserCard from "../UserCard";
import { blue } from "@mui/material/colors";
import HeaderNavigation from "../HeaderNavigation";

export type HeaderProps = {
  sidebarWidth: number,
  onClick: () => void
}

const Header: FC<HeaderProps> = (props) => {
  const {
    sidebarWidth,
    onClick
  } = props

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${sidebarWidth}px)` },
        ml: { sm: `${sidebarWidth}px` },
      }}
      className={styles.root}
      color="transparent"
    >
      <Toolbar
        style={{
          boxShadow: 'none',
          marginTop: -1,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => onClick()}
            sx={{
              ml: 0,
              border: `1px solid ${blue[500]}`,
              borderRadius: 1.5,
              display: { sm: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'flex'
              }
            }}
          >
            <HeaderNavigation />
          </Box>
        </div>

        <UserCard/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
