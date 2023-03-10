import * as React from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';
import Moment from "react-moment";

export type DateFormatProps = {
  date: string
}

const DateFormat: FC<DateFormatProps> = (props) => {
  const {
    date
  } = props

  const toUpperCaseFilter = (d: string) => {
    return d.toUpperCase();
  };

  return (
    <Box>
      <Moment
        format="DD MMM"
        element="b"
        filter={toUpperCaseFilter}
      >
        {date}
      </Moment>
      <br/>
      <Moment format="hh:mm" filter={toUpperCaseFilter}>
        {date}
      </Moment>
    </Box>
  );
}

export default DateFormat
