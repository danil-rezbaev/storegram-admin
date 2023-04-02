import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import CategoryContent from "../../components/CategoryContent";
import axios from "../../axios";
import { openFloatAlert } from "../../store/slices/floatAlertSlice";
import { addCategory } from "../../store/slices/storeSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { Category } from "../Categories/CategoriesTypes";

export type CreateCategoryProps = unknown

const CreateCategory: FC<CreateCategoryProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const formSubmit = async (category: Category) => {
    try {
      const data = await axios.post('/category',
        { category })

      if (data.status === 200) {
        dispatch(openFloatAlert({
          title: `Категория успешно создана`,
          type: "success"
        }))
        navigate('/categories')
        dispatch(addCategory({category }))
      } else {
        dispatch(openFloatAlert({
          title: `Ошибка при создании категории`,
          type: "error"
        }))
      }
    } catch (e) {
      dispatch(openFloatAlert({
        title: `Ошибка при создании категории`,
        type: "error"
      }))
    }
  }

  return (
    <PageContent
      title="Создать категорию"
    >
      <CategoryContent
        onSubmit={formSubmit}
      />
    </PageContent>
  );
}

export default CreateCategory
