import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { Category } from "../Categories/CategoriesTypes";
import axios from "../../axios";
import { openFloatAlert } from "../../store/slices/floatAlertSlice";
import { editCategory } from "../../store/slices/storeSlice";
import CategoryContent from "../../components/CategoryContent";

export type EditCategoryProps = unknown

const EditCategory: FC<EditCategoryProps> = () => {
  const { data } = useAppSelector(store => store.editCategory)

  const {
    code,
  } = data

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const formSubmit = async (category: Category) => {
    try {
      const data = await axios.patch('/category',
        { category })

      if (data.status === 200) {
        dispatch(openFloatAlert({
          title: `Категория успешно изменена`,
          type: "success"
        }))
        navigate('/categories')
        dispatch(editCategory({category}))
      } else {
        dispatch(openFloatAlert({
          title: `Ошибка при изменении категории`,
          type: "error"
        }))
      }
    } catch (e) {
      dispatch(openFloatAlert({
        title: `Ошибка при изменении категории`,
        type: "error"
      }))
    }
  }

  return (
    <PageContent
      title={`Редактировать категорию #${code}`}
    >
      <CategoryContent
        category={data}
        onSubmit={formSubmit}
      />
    </PageContent>
  );
}

export default EditCategory
