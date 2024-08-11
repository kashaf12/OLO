export type CategoryPickerProps = {
  onSelectCategory: (category: string, subcategory: string) => void;
  selectedCategory?: string | null;
};
