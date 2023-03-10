import React, { FC } from 'react';
import styles from "./StoreCard.module.scss";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export type StoreCardProps =  unknown

const StoreCard: FC<StoreCardProps> = () => {
  return (
    <div className={styles.root}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>

      <div>
        <b className={styles.title}>Dodo pizza</b>
        <p className={styles.id}>id123456</p>
      </div>

      {/*<Button*/}
      {/*  onClick={handleClick}*/}
      {/*  sx={{*/}
      {/*    minWidth: 0,*/}
      {/*    width: 30,*/}
      {/*    height: 30,*/}
      {/*    borderRadius: 100*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <KeyboardArrowDownRoundedIcon />*/}
      {/*</Button>*/}
    </div>
  );
};

export default StoreCard;
