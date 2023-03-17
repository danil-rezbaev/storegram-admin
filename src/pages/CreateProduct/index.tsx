import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import ProductContent from "../EditProduct/ProductContent";

export type CreateProductProps = unknown

const CreateProduct: FC<CreateProductProps> = () => {
  return (
    <PageContent
      title={`Создать продукт`}
    >
      <ProductContent type="create" />
    </PageContent>
  );
}

export default CreateProduct
