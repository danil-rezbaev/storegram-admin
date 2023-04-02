import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import ProductContent from "../../components/ProductContent";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { Product } from "../../types/Store";
import axios from "../../axios";
import { openFloatAlert } from "../../store/slices/floatAlertSlice";
import { addProduct } from "../../store/slices/storeSlice";

export type CreateProductProps = unknown

const CreateProduct: FC<CreateProductProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit = async (product: Product) => {
    try {
      const data = await axios.post('/product', { product })

      if (data.status === 200) {
        dispatch(openFloatAlert({
          title: `Товар успешно создан`,
          type: "success"
        }))

        dispatch(addProduct({product }))
        navigate('/products-list')
      } else {
        dispatch(openFloatAlert({
          title: `Ошибка при создании товара`,
          type: "error"
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(openFloatAlert({
        title: `Ошибка при создании товара`,
        type: "error"
      }))
    }
  }

  return (
    <PageContent
      title={`Создать товар`}
    >
      <ProductContent onSubmit={onSubmit} />
    </PageContent>
  );
}

export default CreateProduct
