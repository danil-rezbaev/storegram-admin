import React from 'react';
import { FC, ReactNode } from 'react';
import { Box, Typography } from "@mui/material";
import styles from "./PageContent.module.scss";

export type PageContentProps = {
  title: string,
  description?: string,
  children?: ReactNode
  style?: any
}

const PageContent: FC<PageContentProps> = (props) => {
  const {
    title,
    children,
    description,
    style
  } = props

  return (
    <div className={styles.root} style={style}>
      <Typography
        variant="h4"
        component="h2"
        sx={{fontWeight: 500}}
      >
        { title }
      </Typography>

      <Typography
        variant="subtitle1"
        component="p"
      >
        { description }
      </Typography>

      <Box mt={2}>
        {children}
      </Box>
    </div>
  );
}

export default PageContent
