import React, { FC } from 'react';
import styles from "./UserCard.module.scss";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Logout, PersonRounded, Settings } from "@mui/icons-material";

export type UserCardProps =  unknown

const UserCard: FC<UserCardProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuStyle = {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5
    },
  }

  return (
    <div className={styles.root}>
    <Tooltip title="Профиль">
      <>
        <Avatar
          sx={{
            bgcolor: deepPurple[500],
            width: 35,
            height: 35
          }}
        >
          D
        </Avatar>

          <Typography
            className={styles.title}
            sx={{
              display: {
                xs: 'none',
                sm: 'flex'
              }
            }}
          >
            Daniel
          </Typography>

        <IconButton
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className={styles.hint}
          onClick={handleClick}
        >
          <KeyboardArrowDownRoundedIcon />
        </IconButton>
      </>
    </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={menuStyle}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonRounded fontSize="small" />
          </ListItemIcon>
          Профиль
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Настройки
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            color: red[500]
          }}
        >
          <ListItemIcon
            sx={{
              color: red[500]
            }}
          >
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserCard;
