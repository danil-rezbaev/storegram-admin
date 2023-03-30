import * as React from 'react';
import { FC, useEffect } from 'react';
import PageContent from "../../components/PageContent";
import CategoriesTable from "./CategoriesTable";
import DeleteCategoryModal from "../../modal/DeleteCategoryModal";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { Category } from "./CategoriesTypes";

export type CreateProductProps = unknown

const CreateProduct: FC<CreateProductProps> = () => {
  const navigate = useNavigate()

  const {current, currentStore} = useAppSelector(store => store.store)
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    if(current) {
      const categoriesFormat = currentStore?.categories || []
      setCategories(categoriesFormat)
    }
  }, [current, currentStore])

  return (
    <PageContent
      title="Категории"
      button={{
        title: "Создать",
        handler: () => navigate('/create-category')
      }}
    >
      <CategoriesTable data={categories} />

      <DeleteCategoryModal/>
    </PageContent>
  );
}

export default CreateProduct
