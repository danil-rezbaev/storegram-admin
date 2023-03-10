import React, { FC } from 'react';
import { Link, Stack } from '@mui/material';

export type HeaderNavigationProps = {
  direction?: "row" | "row-reverse" | "column" | "column-reverse",
  spacing?: number
}

const HeaderNavigation: FC<HeaderNavigationProps> = (props) => {
  const {
    direction = "row",
    spacing = 2
  } = props

  return (
    <Stack
      direction={direction}
      spacing={spacing}
    >
      <Link href="#" underline="hover">
        Блог
      </Link>
      <Link href="#" underline="hover">
        Telegram Канал
      </Link>
      <Link href="#" underline="hover">
        Помощь
      </Link>
    </Stack>
  );
};

export default HeaderNavigation;
