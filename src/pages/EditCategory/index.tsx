import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import { useAppSelector } from "../../hooks/redux";
import CategoryContent from "./CategoryContent";

export type EditCategoryProps = unknown

const EditCategory: FC<EditCategoryProps> = () => {
  const store = useAppSelector(store => store.editCategory)

  const {
    code,
  } = store.data

  return (
    <PageContent
      title={`Редактировать категорию #${code}`}
    >
      <CategoryContent
        category={store.data}
        type="update"
      />
    </PageContent>
  );
}

export default EditCategory
