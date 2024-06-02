export type SubCategoriesProps = {
  headerTitle?: string;
  categoryId?: string;
  loading?: boolean;
  error?: { message: string };
  onPressSubCategory: (id: string) => void;
  data?: {
    subCategoriesById: {
      id: string;
      title: string;
    }[];
  };
};
