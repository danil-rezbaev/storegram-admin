import React, { FC } from 'react';
import styles from "./StoreCard.module.scss";
import { Avatar, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { openCreateStoreModal } from "../../store/slices/createStoreModal";
import CreateStoreModal from "../../modal/CreateStoreModal";
import { changeStore } from "../../store/slices/storeSlice";
import { StoreShort } from "../../types/Store";

export type StoreCardProps =  unknown

const StoreCard: FC<StoreCardProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {store} = useAppSelector(store => store)

  const dispatch = useAppDispatch()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectStore = (id: string) => {
    setAnchorEl(null);
    dispatch(changeStore({id}))
  }

  const menuStyle = {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5
    },
  }

  const openCreateNewModal = () => {
    dispatch(openCreateStoreModal())
  }

  const currentStoreFormat = store.current ?? {
    title: 'Загрузка'
  }
  const currentStoreFirstLetter = currentStoreFormat.title.charAt(0)


  if(!store.current) {
    return (
      <>
        <Button
          variant="contained"
          startIcon={<ControlPointIcon />}
          size="medium"
          onClick={openCreateNewModal}
          fullWidth
        >
          Создать новый магазин
        </Button>

        <CreateStoreModal/>
      </>
    )
  }

  return (
    <div className={styles.root}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>
        {currentStoreFirstLetter}
      </Avatar>

      <div>
        <b className={styles.title}>
          {currentStoreFormat.title}
        </b>
      </div>

      <Tooltip title="Мои магазины">
        <Button
          onClick={handleClick}
          sx={{
            minWidth: 0,
            width: 30,
            height: 30,
            borderRadius: 100
          }}
        >
          <KeyboardArrowDownRoundedIcon />
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="stores-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={menuStyle}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {
          (store.modifier as StoreShort[]).map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => selectStore(item.id)}
            >
              {item.title}
            </MenuItem>
          ))
        }

        <MenuItem onClick={openCreateNewModal}>
          <Button
            variant="contained"
            startIcon={<ControlPointIcon />}
            size="small"
            fullWidth
            sx={{
              background: 'transparent',
              color: 'black',
              boxShadow: 'none',
              p: 0,
              '&:hover': {
                background: 'transparent',
                boxShadow: 'none',
              }
            }}
          >
            Новый магазин
          </Button>
        </MenuItem>
      </Menu>

      <CreateStoreModal/>
    </div>
  );
};

export default StoreCard;
