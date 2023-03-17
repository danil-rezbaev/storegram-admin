import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import { useAppSelector } from "../../hooks/redux";
import ProductContent from "./ProductContent";

export type EditProductProps = unknown

const EditProduct: FC<EditProductProps> = () => {
  const store = useAppSelector(store => store.editProduct)

  const {
    id,
  } = store.data

  return (
    <PageContent
      title={`Редактировать продукт #${id}`}
    >
      <ProductContent
        product={store.data}
        type="update"
      />
    </PageContent>
  );
}

export default EditProduct
