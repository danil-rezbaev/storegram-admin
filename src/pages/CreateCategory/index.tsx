import * as React from 'react';
import { FC } from 'react';
import PageContent from "../../components/PageContent";
import CategoryContent from "./CategoryContent";

export type CreateCategoryProps = unknown

const CreateCategory: FC<CreateCategoryProps> = () => {
  return (
    <PageContent
      title="Создать категорию"
    >
      <CategoryContent
        type="create"
      />
    </PageContent>
  );
}

export default CreateCategory
