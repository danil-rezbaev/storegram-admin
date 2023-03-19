import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import CategoriesTable from "./CategoriesTable";
import { categoriesTable } from "../../layout/pages/categories/categories";
import DeleteCategoryModal from "../../modal/DeleteCategoryModal";
import { useNavigate } from "react-router-dom";

export type CreateProductProps = unknown

const CreateProduct: FC<CreateProductProps> = () => {
  const navigate = useNavigate()

  return (
    <PageContent
      title="Категории"
      button={{
        title: "Создать",
        handler: () => navigate('/create-category')
      }}
    >
      <CategoriesTable data={categoriesTable} />

      <DeleteCategoryModal/>
    </PageContent>
  );
}

export default CreateProduct
