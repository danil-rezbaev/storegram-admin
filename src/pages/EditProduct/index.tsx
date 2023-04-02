import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ProductContent from "../../components/ProductContent";
import axios from "../../axios";
import { openFloatAlert } from "../../store/slices/floatAlertSlice";
import { editProduct } from "../../store/slices/storeSlice";
import { Product } from "../../types/Store";
import { useNavigate } from "react-router-dom";

export type EditProductProps = unknown

const EditProduct: FC<EditProductProps> = () => {
  const {data} = useAppSelector(store => store.editProduct)

  const {
    title,
  } = data

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit = async (product: Product) => {
    try {
      const data = await axios.patch('/product', { product: product })

      if (data.status === 200) {
        dispatch(openFloatAlert({
          title: `Товар успешно изменен`,
          type: "success"
        }))

        dispatch(editProduct({product: product}))
        navigate('/products-list')
      } else {
        dispatch(openFloatAlert({
          title: `Ошибка при изменении товара`,
          type: "error"
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(openFloatAlert({
        title: `Ошибка при изменении товара`,
        type: "error"
      }))
    }
  }

  return (
    <PageContent
      title={`Редактировать товар: ${title}`}
    >
      <ProductContent
        product={data}
        onSubmit={onSubmit}
      />
    </PageContent>
  );
}

export default EditProduct
