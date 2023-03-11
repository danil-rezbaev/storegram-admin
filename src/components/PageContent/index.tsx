import React from 'react';
import { FC, ReactNode } from 'react';
import { Box, Button, Typography } from "@mui/material";
import styles from "./PageContent.module.scss";
import { AddOutlined } from "@mui/icons-material";

export type PageContentProps = {
  title: string,
  description?: string,
  children?: ReactNode
  style?: any,
  button?: {
    title: string,
    handler: () => any
  }
}

const PageContent: FC<PageContentProps> = (props) => {
  const {
    title,
    children,
    description,
    style,
    button
  } = props

  return (
    <div className={styles.root} style={style}>
      <div className={styles.header}>
        <Typography
          variant="h4"
          component="h2"
          sx={{fontWeight: 500}}
        >
          { title }
        </Typography>

        {button ? (
          <Button
            variant="contained"
            startIcon={<AddOutlined />}
            onClick={button.handler}
          >
            <b> {button.title}</b>
          </Button>
        ) : null}
      </div>


      <Typography
        variant="subtitle1"
        component="p"
      >
        { description }
      </Typography>

      <Box mt={4}>
        {children}
      </Box>
    </div>
  );
}

export default PageContent
