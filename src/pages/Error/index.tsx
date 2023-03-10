import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";

export type ErrorProps = {
  title: string,
  description?: string,
}

const Error: FC<ErrorProps> = (props) => {
  const {
    title,
    description
  } = props

  return (
    <PageContent title={title} description={description}/>
  );
}

export default Error
