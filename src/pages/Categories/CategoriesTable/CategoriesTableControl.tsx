import * as React from 'react';
import { FC } from 'react';
import { IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { DeleteRounded, EditRounded, MoreVert } from "@mui/icons-material";
import { blue, grey, red } from "@mui/material/colors";
import styles from "../../../components/UserCard/UserCard.module.scss";
import { useAppDispatch } from "../../../hooks/redux";
import { openDeleteCategoryModal } from "../../../store/deleteCategoryModal";
import { useNavigate } from "react-router-dom";

export type CategoriesTableControlProps = {
  id: string,
  title: string
}

const CategoriesTableControl: FC<CategoriesTableControlProps> = (props) => {
  const {
    id,
    title
  } = props

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch()

  const handleDelete = () => {
    setAnchorEl(null);
    dispatch(openDeleteCategoryModal({ id, title}))
  }

  const handleEdit = () => {
    navigate('/edit-category')
    setAnchorEl(null);
  }

  const menuStyle = {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5
    },
  }

  return (
    <div>
      <Tooltip title="Действия">
        <IconButton
          size="medium"
          aria-controls={open ? 'category-row-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className={styles.hint}
          onClick={handleClick}
          sx={{
            color: open ? blue[500] : grey[900]
          }}
        >
          <MoreVert />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="category-row-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={menuStyle}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditRounded fontSize="small" />
          </ListItemIcon>
          Редактировать
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon
            sx={{color: red[500]}}
          >
            <DeleteRounded fontSize="small"/>
          </ListItemIcon>
          <p style={{color: red[500]}}>
            Удалить
          </p>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default CategoriesTableControl
