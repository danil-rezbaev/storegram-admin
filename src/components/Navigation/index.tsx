import React, { FC } from 'react';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import styles from "./Navigation.module.scss";
import menuItems from "../../layout/sidebar/menu";
import cs from 'classnames'
import { useLocation, useNavigate } from "react-router-dom";

export type NavigationProps = {
  toggleOpen: () => void,
  className?: string
}

const Navigation: FC<NavigationProps> = (props) => {
  const {
    toggleOpen,
    className
  } = props

  const {pathname} = useLocation()
  const location = pathname.split('/')[1]

  const navigate = useNavigate()

  const handleClick = (code: string) => {
    navigate(`/${code}`)
    toggleOpen()
  }

  return (
    <List className={cs(styles.root, className)} disablePadding>
      {menuItems.map((item) => {
        const selected = item.code === location
         return (
           <ListItemButton
             key={item.title}
             component="li"
             selected={selected}
             onClick={() => handleClick(item.code)}
             className={cs(styles.menuItem, selected ? styles.menuItemSelected : null)}
          >
            <ListItemIcon
              style={{
                minWidth: 40,
                color: 'inherit'
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
         )})}
    </List>
  );
};

export default Navigation;
